'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	//* para traerme todos los usuarios

	const [allUsers, setAllUsers] = useState([])
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllUsers(data)
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
	const cardLimit = 100
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
			<h1 className='font-bold text-3xl sm:text-5xl'>Welcome to dashboard</h1>
			<hr className='border border-silver' />
			<div className='flex flex-col md:grid md:grid-cols-2 gap-8 text-center pt-5'>
				<div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 flex flex-col h-40 justify-evenly'>
					<p className='text-4xl font-extrabold'> {allUsers?.length}</p>
					<p className='font-semibold text-xl sm:text-2xl'>Users</p>
					<p className='font-light'>
						<Link href='/dashboard/users'>
							<span className='hover:underline hover:decoration-yaleblue'>View</span>
						</Link>
					</p>
				</div>
				<div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 flex flex-col h-40 justify-evenly'>
					<p className='text-4xl font-extrabold'>{allAppointments.length} </p>
					<p className='font-semibold text-xl sm:text-2xl'>Appointments</p>
					<p className='font-light'>
						<Link href='/dashboard/appointments'>
							<span className='hover:underline hover:decoration-yaleblue'>View</span>
						</Link>
					</p>
				</div>
				<div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 flex flex-col h-40 justify-evenly'>
					<p className='text-4xl font-extrabold'> {allParkinglots?.length}</p>
					<p className='font-semibold text-xl sm:text-2xl'>Parking lots</p>
					<p className='font-light'>
						<Link href='/dashboard/parkinglots'>
							<span className='hover:underline hover:decoration-yaleblue'>View</span>
						</Link>
					</p>
				</div>
				<Link href='/dashboard/parkinglots'>
					<button
						type='button'
						className='border border-silver /80 rounded-lg shadow-lg shadow-erieblack/80 flex flex-col h-40 py-2 px-4 font-medium text-center justify-center items-center text-ghostwhite bg-yaleblue hover:bg-yaleblue/90 w-full focus:ring-4 focus:outline-none'
					>
						<h3 className='flex font-bold text-xl sm:text-2xl justify-center items-center'>Create a new Parking</h3>
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Page
