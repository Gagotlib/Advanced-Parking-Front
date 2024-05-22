'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	//* para traerme todos los usuarios

	const [allUsers, setAllsers] = useState([])
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllsers(data)
			})
	}, [])

	const [allParkinglots, setAllParkinglots] = useState([])
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/parking-lot`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllParkinglots(data)
			})
	}, [])

	const [allAppointments, setAllAppointments] = useState([])
	const [page, setPage] = useState(1)
	const cardLimit = 20
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		// console.log(token);
		axios
			.get(`${rute}/appointments?page=${page}&limit=${cardLimit}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllAppointments(data)
			})
	}, [])

	return (
		<div className='flex flex-col min-h-screen  md:pt-8'>
			<h1>Welcome to dashboard</h1>
			<div className='flex flex-col md:grid md:grid-cols-2 gap-8 text-center'>
				<div className='border rounded-xl flex flex-col h-40 gap-4 pt-4'>
					<h3 className='font-bold'>User</h3>
					<p>Total of users:</p>
					<p className='text-4xl'> {allUsers?.length}</p>
				</div>
				<div className='border rounded-xl flex flex-col h-40 gap-4 pt-4'>
					<h3 className='font-bold'>Appointments</h3>
					<p>Total of Appointments: </p>
					<p className='text-4xl'>{allAppointments.length} </p>
				</div>
				<div className='border rounded-xl flex flex-col h-40 gap-4 pt-4'>
					<h3 className='font-bold'>Parking lots</h3>
					<p>Total of Parkings:</p>
					<p className='text-4xl'> {allParkinglots?.length}</p>
				</div>
				<div className='border rounded-xl flex flex-col h-40 gap-4 py-4 mb-4 items-center'>
					<h3 className='font-bold'>Make a appointment</h3>
					<button type='button' className='py-2 px-4 text-sm w-1/2 font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'>
						Make a new Appointment
					</button>
				</div>
			</div>
		</div>
	)
}

export default Page
