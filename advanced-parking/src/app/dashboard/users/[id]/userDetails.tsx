'use client'
import BookingsUser from '@/app/components/bookings/BookingsUser'
import { IUser } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserDetails = ({ params }: { params: { id: string } }) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [userDetails, setUserDetails] = useState<IUser | null>(null)

	//me traigo del back los datos de ese user segun id
	useEffect(() => {
		//!necesito token
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user/${params.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => setUserDetails(data))
	}, [])

	const handleDeleteUser = () => {
		if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS USER? ')) {
			axios.delete(`${rute}/user/${params.id}`)
		}
		alert('USUARIO ELIMINADO')
	}

	return (
		<div className='flex flex-col min-h-screen pt-2 md:pt-14 gap-8'>
			<h1> User Details</h1>
			<h3> Name: {userDetails?.name}</h3>
			<h3> Email: {userDetails?.email}</h3>

			<button
				type='button'
				className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-silver hover:bg-red-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
				onClick={handleDeleteUser}
			>
				{' '}
				Delete User{' '}
			</button>

			<BookingsUser userAppointments={userDetails?.appointments} />
		</div>
	)
}

export default UserDetails
