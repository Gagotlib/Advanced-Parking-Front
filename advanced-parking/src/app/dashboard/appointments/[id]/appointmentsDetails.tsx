'use client'
import { showSweetAlert, showSweetAlertAppointment } from '@/app/components/alerts/SweetAlert'
import BookingDetail, { IBooking } from '@/app/success/[id]/BookingDetail'
import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'

interface IAppointment {
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
	slot: {
		id: string
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
		image: string | null
		name: string
		password: string
		phone: string
		role: string
		status: string
	}
}

const AppointmentsDetails = ({ params }: { params: { id: string } }) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [appointmentDetails, setAppointmentDetails] = useState<IAppointment | null>(null)
	const [observer, setObserver] = useState(0)

	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/appointments/${params.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => setAppointmentDetails(data))
	}, [observer])

	const handleDeleteAppointment = () => {
		const token = localStorage.getItem('authToken')
		console.log('Boorando appointment')
		//*alerta para solicitar confirmacion
		showSweetAlertAppointment(() => {
			//* funcion que me elimine el appointment
			axios
				.delete(`${rute}/appointments/${params.id}`, {
					headers: {
						Authorization: `Bearer: ${token}`
					}
				})
				.then(({ data }) => console.log(data))
		})
		setObserver((observer) => observer + 1)
	}
	console.log(appointmentDetails)

	return (
		<Suspense fallback={<h1></h1>}>
			{appointmentDetails ? (
				<div className='flex flex-col  min-h-screen px-4 pb-4 lg:pt-10'>
					<div className='bg-ghostwhite dark:bg-gray-500 border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 px-6 mx-auto mt-8 '>
						<div className='mb-8 '>
							<h2 className='text-lg font-bold mb-4'>
								Appointment id: <span className='text-erieblack/80 text-sm dark:text-ghostwhite'>{appointmentDetails.id}</span>
							</h2>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Satus: {appointmentDetails.status}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Name: {appointmentDetails.user.name}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Email: {appointmentDetails.user.email} </p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Parking: {appointmentDetails.parking_lot.name}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Slot: {appointmentDetails.slot_number}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Check-in date: {appointmentDetails.date}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Check-in hour: {appointmentDetails.time}</p>
							<p className='text-erieblack/80 dark:text-ghostwhite text-sm'>Address: {appointmentDetails.parking_lot.location}</p>
						</div>
						<table className='w-full mb-8'>
							<thead>
								<tr>
									<th className='text-left font-bold text-erieblack dark:text-ghostwhite'>License Plate</th>
									<th className='text-left font-bold text-erieblack dark:text-ghostwhite'>Time</th>
									<th className='text-right font-bold text-erieblack dark:text-ghostwhite'>Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='text-left font-light text-erieblack/80 dark:text-ghostwhite'>{appointmentDetails.license_plate}</td>
									<td className='text-left font-light text-erieblack/80 dark:text-ghostwhite'>{appointmentDetails.duration} hrs</td>
									<td className='text-right font-light text-erieblack/80 dark:text-ghostwhite'>{appointmentDetails.total} $</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td className='text-left font-bold text-erieblack dark:text-ghostwhite'>Total</td>
									<td></td>
									<td className='text-right font-bold text-erieblack dark:text-ghostwhite'>{appointmentDetails.total} €</td>
								</tr>
							</tfoot>
						</table>
					</div>
					{
						appointmentDetails.status === 'active' &&
              <button onClick={handleDeleteAppointment} type='button' className='bg-red-500 text-white rounded-lg px-4 py-2 mt-4 w-fit'>
                Delete Appointment
              </button>
            
					}
				</div>
			) : (
				// <div className='flex flex-col min-h-screen md:pt-8'>
				// 	<h1 className='font-medium text-4xl lg:text-5xl'>Appointments Details</h1>
				// 	<div className='flex flex-col gap-8 text-lg'>
				// 		<p>Appopintment id: {appointmentDetails.id}</p>
				// 		<p>Parking: {appointmentDetails.parking_lot.name}</p>
				// 		<p>Parking address{appointmentDetails.parking_lot.location}</p>
				// 		<p>Appointment date:{appointmentDetails.date}</p>
				// 		<p>Appointment time:{appointmentDetails.time}</p>
				// 		<p>Appointment duration:{appointmentDetails.duration}</p>
				// 		<p>Appointment slot:{appointmentDetails.slot_number}</p>
				// 		<p>Appointment total: {appointmentDetails.total}</p>
				// 		<p>Appointment license plate:{appointmentDetails.license_plate}</p>
				// 	{appointmentDetails.status === 'active' ? (
				// 		<button onClick={handleDeleteAppointment} type='button' className='bg-red-500 text-white rounded-lg px-4 py-2 mt-4 w-fit'>
				// 			Delete Appointment
				// 		</button>
				// 	) : (
				// 		<p className='text-red-500'>Appointment status: {appointmentDetails.status}</p>
				// 	)}
				// 	</div>
				// </div>
				<div className='flex flex-col min-h-screen md:pt-6'>
					<h1>Loading...</h1>
				</div>
			)}
		</Suspense>
	)
}

export default AppointmentsDetails
