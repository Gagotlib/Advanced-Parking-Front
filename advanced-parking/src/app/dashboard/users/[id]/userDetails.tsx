'use client'
import { showSweetAlertDeleteAccounAdmin } from '@/app/components/alerts/SweetAlert'
import BookingsAdmin from '@/app/components/bookings/BookingsAdmin'
import { IUser } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const UserDetails = ({ params }: { params: { id: string } }) => {
	const router = useRouter()
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [observer, setObserver] = useState(0)
	const [userDetails, setUserDetails] = useState<IUser | null>(null)
	const [isEditInput, setIsEditInput] = useState(false)

	useEffect(() => {
		//me traigo del back los datos de ese user segun id

		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user/${params.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => setUserDetails(data))
	}, [observer])

	const handleDeleteUser = () => {
		showSweetAlertDeleteAccounAdmin(() => {
			const token = localStorage.getItem('authToken')
			axios
				.delete(`${rute}/user/${params.id}`, {
					headers: {
						Authorization: `Bearer: ${token}`
					}
				})
				.then((response) => {
					// console.log(response)
					router.push('/dashboard/users')
				})
		})
	}

	const handleShowEdit = () => {
		setIsEditInput(!isEditInput)
	}

	const [formData, setFormData] = useState<{ [key: string]: any }>({})

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	const handleSendChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.log('fomrdata:', formData)

		const registerPayload = formData.phone
			? {
					...formData,
					phone: parseInt(formData.phone, 10)
			  }
			: formData

		//* solicitud al back con el formulario de los cambios
		const token = localStorage.getItem('authToken')
		axios
			.put(`${rute}/user/${params.id}`, registerPayload, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then((response) => {
				// console.log(response)
				setObserver((observer) => observer + 1)
				setFormData({})
				setIsEditInput(false)
			})
	}

	// console.log('userDetails', userDetails)

	return (
		<Suspense fallback={<h1></h1>}>
			{userDetails ? (
				<div className='flex flex-col min-h-screen pt-2 md:pt-14 gap-3'>
					<h1> User Details</h1>
					<div className='flex'>
						<div className='flex flex-col'>
							<h2> Name: {userDetails?.name}</h2>
							<h2> Email: {userDetails?.email}</h2>
							<h2> Phone: {userDetails?.phone}</h2>
							<h2> Status: {userDetails?.status}</h2>
							<button
								type='button'
								className=' py-2 px-2 w-20 h-10 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-blue-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
								onClick={handleShowEdit}
							>
								Edit
							</button>
						</div>
						{isEditInput && (
							<div className=' flex flex-col ml-5'>
								<form onSubmit={handleSendChanges} className=' flex flex-col '>
									<input type='text' name='name' id='nameinput' placeholder='New Name' className='text-md rounded-xl border h-10 mt-2' onChange={handleChangeValue} value={formData.name} />

									<div className='text-lg h-10 mt-6 text-red-500'> Email can not be changed</div>
									<input type='phone' name='phone' id='phoneinput' placeholder='New Phone' className='text-md rounded-xl border h-10 mt-5' onChange={handleChangeValue} value={formData.phone} />
									<button
										type='submit'
										className='mt-1 py-2 px-2 w-20 h-10 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-blue-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
									>
										Send
									</button>
								</form>
							</div>
						)}
					</div>
					<button
						type='button'
						className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-silver hover:bg-red-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
						onClick={handleDeleteUser}
					>
						{' '}
						Delete User{' '}
					</button>

					<BookingsAdmin userAppointments={userDetails?.appointments} />
				</div>
			) : (
				<div className='flex flex-col min-h-screen md:pt-6'>
					<h1>Loading...</h1>
				</div>
			)}
		</Suspense>
	)
}

export default UserDetails
