'use client'
import LoadingParkings from '@/app/components/suspense/LoadingParkings'
import { IBooking } from '@/app/success/[id]/BookingDetail'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

type Props = {}

export const Appointments = (props: Props) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allAppointments, setAllAppointments] = useState<IBooking[] | null>(null)
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
	console.log(allAppointments)

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<h1>These are all the Appointments</h1>
			<div className='flex flex-col '>
				<Suspense fallback={<p>Loading...</p>}>
					<h2>Total of Appointments: {allAppointments?.length}</h2>
					{allAppointments ? (
						allAppointments.map((appointment) => (
							<Link key={appointment.id} href={`/dashboard/appointments/${appointment.id}`} className='flex flex-col border border-1 p-2 hover:bg-slate-200 w-28'>
								<p>{appointment.slot.parking_lot.name}</p>
								<p>{appointment.date}</p>
								<p>{appointment.time}</p>
								<p>{appointment.slot.slot_number}</p>
								<p>{appointment.status}</p>
							</Link>
						))
					) : (
						<p>Loading...</p>
					)}
				</Suspense>
			</div>
		</div>
	)
}

export default Appointments
