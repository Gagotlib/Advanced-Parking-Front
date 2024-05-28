'use client'

import axios from 'axios'
import Avatar from 'react-avatar'
import { useAuth } from '../context/AuthContext'
import React, { useEffect, useState } from 'react'
import BookingsUser from '../components/bookings/BookingsUser'
import ProfileEdit from '../components/profile_file/ProfileEdit'
import { showSweetAlertDeleteAccountUser } from '../components/alerts/SweetAlert'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface IApointment {
	date: string
	duration: string
	id: string
	is_parked: boolean
	license_plate: string
	parking_lot: {
		id: string
		lat: string
		lng: string
		location: string
		name: string
		slots_stock: number
	}
	slot_number: string
	status: string
	time: string
	total: number
}

const Profile = () => {
	const router = useRouter()
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const { user, setUser } = useAuth()

	const [userAppointments, setUserAppointments] = useState<IApointment[] | null>(null)
	// const [showChangeImage, setShowChangeImage] = useState(false)
	const [showChangeInfo, setShowChangeInfo] = useState(false)
	const [observer, setObserver] = useState(0)

	useEffect(() => {
		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		// console.log('logedUser: ', logedUser)
		const token = localStorage.getItem('authToken')
		// console.log('token: ', token)

		//! hacer peticion al back por id del usuario para tener las reservas
		const userId = logedUser.id
		const response = axios
			.get(`${rute}/user/${userId}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setUser(data)
				setUserAppointments(data.appointments)
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observer])

	const handleChangeInfo = () => {
		setShowChangeInfo(!showChangeInfo)
	}

	const handleDeleteAccount = () => {
		showSweetAlertDeleteAccountUser(async () => {
			const rute = process.env.NEXT_PUBLIC_BACK_API_URL
			await axios
				.delete(`${rute}/user/${user?.id}`, {
					headers: {
						Authorization: `Bearer: ${localStorage.getItem('authToken')}`
					}
				})
				.then((response) => {
					// console.log(response)
					router.push('/home')

					localStorage.removeItem('authToken')
					localStorage.removeItem('user')
					// setToken(null)
					setUser(null)
					signOut()
				})
		})
	}

	return (
		<div className=''>
			<main className='h-3/4 w-full flex flex-col pt-24 gap-4'>
				<div className='p-2 md:p-4'>
					<h2 className='pl-6 text-5xl font-bold sm:text-5xl'>{user?.name}</h2>
					<div className='flex flex-col lg:flex-row  w-full px-6 pb-8 mt-8 sm:rounded-lg'>
						<div className='flex  mt-8 gap-5 sm:gap-10'>
							<div className='flex flex-col gap-3 items-center space-y-5 sm:space-y-0'>
								<Avatar src={user?.image} name={user?.name} className='object-cover' size='150' round color='#1C1C1C' maxInitials={2} />

								<button
									type='button'
									className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
									onClick={handleChangeInfo}
								>
									Edit Profile
								</button>
								<button
									type='button'
									className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-red-500 rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
									onClick={handleDeleteAccount}
								>
									Delect Account
								</button>
							</div>
							<div className='items-center mt-8 sm:mt-14 text-erieblack dark:text-ghostwhite'>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue dark:text-ghostwhite'>
										Your email
									</label>
									{user?.email}
								</div>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue dark:text-ghostwhite'>
										Your Phone
									</label>
									{user?.phone}
								</div>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue dark:text-ghostwhite'>
										Subscription
									</label>
									Soon you will be able to enjoy our subscriptions plans and additional benefits
								</div>
							</div>
						</div>
						<div className='block pt-5'>{showChangeInfo && <ProfileEdit observer={observer} setObserver={setObserver} showChangeInfo={showChangeInfo} setShowChangeInfo={setShowChangeInfo} />}</div>
					</div>
					<BookingsUser userAppointments={userAppointments} />
				</div>
				<div className='pb-4 text-sm pl-4 sm:text-lg'>
					<p className='text-erieblack dark:text-ghostwhite'>
						We would like to know your opinion about our service. Please visit this
						<Link href='/rating'>
							<span className='text-erieblack dark:text-ghostwhite underline hover:decoration-yaleblue focus:underline focus:decoration-yaleblue'> link </span>
						</Link>
						and tell us.
					</p>
				</div>
			</main>
		</div>
	)
}

export default Profile
