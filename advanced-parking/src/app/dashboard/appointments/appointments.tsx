'use client'
import LoadingParkings from '@/app/components/suspense/LoadingParkings'
import { IBooking } from '@/app/success/[id]/BookingDetail'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'


export interface IAppointment {
	date: string
	duration: string
	id: string
	is_parked: boolean
	license_plate: string
	slot: {
		id: string
		parking_lot: {
			id: string
			lat: string
			lng: string
			location: string
			name: string
			slots_stock: number
		}
		slot_number: number
		slot_status: string
	}
	slot_number: string
	status: string
	time: string
	total: number
	user: {
		email: string
		id: string
		image: string
		name: string
		password: string
		phone: string
		role: string
		status: string
	}
}

export const Appointments = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allAppointments, setAllAppointments] = useState<IAppointment[] | null>(null)
	const [page, setPage] = useState(1)
	const cardLimit = 50
	const router = useRouter()

	// const fetchAppointments = async () => {
	// 	const token = localStorage.getItem('authToken')
	// 	try {
	// 		const { data } = await axios.get(`${rute}/appointments?page=${page}&limit=${cardLimit}`, {
	// 			headers: {
	// 				Authorization: `Bearer: ${token}`
	// 			}
	// 		})
	// 		// Ordenar por fecha descendente
	// 		const sortedAppointments = data.sort((a: IAppointment, b: IAppointment) => new Date(b.date).getTime() - new Date(a.date).getTime())
	// 		setAllAppointments(sortedAppointments)
	// 	} catch (error) {
	// 		console.error('Error fetching appointments:', error)
	// 	}
	// }

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
				const sortedAppointments = data.sort((a: IAppointment, b: IAppointment) => new Date(b.date).getTime() - new Date(a.date).getTime())
				setAllAppointments(sortedAppointments)
			})
	}, [])

	// useEffect(() => {
	// 	fetchAppointments()
	// }, [page, rute])

	const handleRefresh = () => {
		router.refresh()
	}

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl sm:text-5xl font-bold'>Info Appointments</h1>
				<button onClick={handleRefresh} className='px-4 py-2 h-10 bg-yaleblue text-ghostwhite rounded hover:bg-yaleblue/80'>
					Refresh
				</button>
			</div>
			<div className='flex flex-col '>
				<Suspense fallback={<p>Loading...</p>}>
					<h3 className='flex justify-end text-md sm:text-xl font-base'>Total appointments: <span className='font-bold'>{allAppointments?.length}</span></h3>
					<table className='sm:max-w-full min-w-full table-auto w-full h-full border-collapse'>
						<thead>
							<tr>
								<th className='border p-2 text-left'>Parking</th>
								<th className='border p-2 text-left'>Date</th>
								<th className='border p-2 text-left'>User</th>
								<th className='border p-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{allAppointments ? (
								allAppointments.map((appointment) => (
									<tr key={appointment.id} className='hover:bg-silver/20'>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>
												{appointment.slot.parking_lot.name}
											</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>
												{appointment.date}
											</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>
												{appointment.user.name}
											</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>
												{appointment.status}
											</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} className='border p-2 text-center'>Loading...</td>
								</tr>
							)}
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	)
}

export default Appointments
