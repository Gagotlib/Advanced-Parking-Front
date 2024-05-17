'use client'

import React, { useEffect, useState } from 'react'
import BookingsUser from '../components/bookings/BookingsUser'
import Avatar from 'react-avatar'
import axios from 'axios'

interface IApointment {
	id: string
	parkingLot: string
	date: string
	hour: string
	licensePlate: string
}
const Profile = () => {
	const usernull = {
		name: '',
		email: '',
		phone: '',
		role: '',
		image: ''
	}

	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [user, setUser] = useState(usernull)
	const [userAppointments, setUserAppointments] = useState<IApointment[] | null>([{ id: '123123123', parkingLot: 'nombre estacionamiento', date: '15/05/2024', hour: '09:00', licensePlate: 'AAA111' }])

	useEffect(() => {
		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		console.log('logedUser: ', logedUser)
		const token = localStorage.getItem('authToken')
		console.log('token: ', token)

		setUser(logedUser)

		//! hacer peticion al back por id del usuario para tener las reservas
		const userId = logedUser.id
		const response = axios
			.get(`${rute}/user/${userId}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => setUserAppointments(data.appointments))
	}, [])
	console.log('user appointments', userAppointments)

	const [showChangeImage, setShowChangeImage] = useState(false)
	const [newImage, setNewImage] = useState('')
	const handleChangeImage = () => {
		setShowChangeImage(!showChangeImage)
	}
	const handleSendNewImage = (e: any) => {
		console.log(newImage)
		//! funcion que lleve el archivo al back
	}
	const handleDeleteImage = () => {
		//! funcion que permita hacer user.image="" y se guarde en bd
	}

	return (
		<div className=''>
			<main className='h-3/4 w-full flex flex-col pt-24 gap-4'>
				<div className='p-2 md:p-4'>
					<h2 className='pl-6 text-5xl font-bold sm:text-5xl'>{user?.name}</h2>
					<div className='w-full px-6 pb-8 mt-8 sm:rounded-lg'>
						<div className='flex mt-8 gap-5 sm:gap-10'>
							<div className='flex flex-col gap-3 items-center space-y-5 sm:space-y-0'>
								<Avatar src={user?.image} name={user.name} size='150' round color='#1C1C1C' maxInitials={2} />
								<div className='flex flex-col gap-2 sm:ml-2'>
									<button
										type='button'
										className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
										onClick={handleChangeImage}
									>
										Change picture
									</button>
									<button
										type='button'
										className='py-2 px-2 text-base font-medium text-yaleblue focus:outline-none bg-white rounded-lg border border-silver hover:bg-yaleblue/90 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
										onClick={handleDeleteImage}
									>
										Delete picture
									</button>
								</div>
							</div>
							<div className='items-center mt-8 sm:mt-14 text-erieblack'>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue'>
										Your email
									</label>
									{user?.email}
								</div>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue'>
										Your Phone
									</label>
									{user?.phone}
								</div>
								<div className='mb-2 sm:mb-6'>
									<label htmlFor='email' className='block mb-2 text-sm font-bold text-yaleblue'>
										Suscription
									</label>
									Platinum || Gold || Standard
								</div>
								{showChangeImage && (
									<div>
										<input type='file' className='' onChange={(e) => setNewImage(e.target.files ? (e.target.files[0] as any) : null)}></input>
										<button
											type='button'
											onClick={(e) => handleSendNewImage(e)}
											className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
										>
											Send
										</button>
									</div>
								)}
							</div>
						</div>
						<BookingsUser userAppointments={userAppointments} />
					</div>
				</div>
			</main>
		</div>
	)
}

export default Profile
