'use client'

import React, { useEffect, useState } from 'react'
import BookingsUser from '../components/bookings/BookingsUser'
import Avatar from 'react-avatar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { showSweetAlert } from '../components/alerts/SweetAlert'


interface IApointment {
	id: string
	parkingLot: string
	date: string
	hour: string
	licensePlate: string
}
const Profile = () => {
	const router = useRouter()
	const usernull = {
		name: '',
		email: '',
		phone: '',
		role: '',
		image: ''
	}

	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const { user, setUser } = useAuth()
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [showChangeImage, setShowChangeImage] = useState(false)

	const handleChangeImage = () => {
		setShowChangeImage(!showChangeImage)
	}

	const handleSendNewImage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const fileInput = document.getElementById('fileInput') as HTMLInputElement
		const file = fileInput?.files ? fileInput.files[0] : null
		console.log('fileinput', file)

		if (!file) {
			console.error('No file selected')
			return
		}

		const formData = new FormData()
		formData.append('file', file)
		// for (let key of formData.keys()) {
		// 	console.log(key, formData.get(key))
		// }

		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		if (!logedUser) {
			console.error('No logged user found')
			return
		}
		const token = localStorage.getItem('authToken')
		if (!token) {
			console.error('No auth token found')
			return
		}
		// funcion que lleve el archivo al back

		axios
			.post(`${rute}/files/profile-image/${logedUser.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				setUser(response.data)
			})
			.catch((error) => console.error('Error uploading file:', error))
	}
	const handleDeleteImage = () => {
		// funcion que permita hacer user.image="" y se guarde en bd
		showSweetAlert(() => {
			const userString = localStorage.getItem('user')
			const logedUser = userString ? JSON.parse(userString) : null
			const token = localStorage.getItem('authToken')
			axios.delete(`${rute}/files/profile-image/${logedUser.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})

			const updatedUser = { ...logedUser, image: '' }
			setUser(updatedUser)
			localStorage.setItem('user', JSON.stringify(updatedUser))
		})
	}

	return (
		<div className=''>
			<main className='h-3/4 w-full flex flex-col pt-24 gap-4'>
				<div className='p-2 md:p-4'>
					<h2 className='pl-6 text-5xl font-bold sm:text-5xl'>{user?.name}</h2>
					<div className='w-full px-6 pb-8 mt-8 sm:rounded-lg'>
						<div className='flex mt-8 gap-5 sm:gap-10'>
							<div className='flex flex-col gap-3 items-center space-y-5 sm:space-y-0'>
								<Avatar src={user?.image} name={user?.name} className='object-cover' size='150' round color='#1C1C1C' maxInitials={2} />
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
										className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
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
										Subscription
									</label>
									Platinum || Gold || Standard
								</div>
								{showChangeImage && (
									<form className='flex gap-1' onSubmit={handleSendNewImage}>
										<input id='fileInput' type='file' className='file-input file-input-bordered file-input-warning w-full max-w-xs' name='file' accept='image/*' required></input>
										<button
											type='submit'
											className='py-2 px-2 text-base h-12 font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
										>
											Upload File
										</button>
									</form>
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
