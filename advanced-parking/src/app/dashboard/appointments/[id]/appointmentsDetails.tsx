'use client'
import { IBooking } from '@/app/success/[id]/BookingDetail'
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
}

const AppointmentsDetails = ({ params }: { params: { id: string } }) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [appointmentDetails, setAppointmentDetails] = useState<IAppointment | null>(null)

	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/appointments/${params.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => setAppointmentDetails(data))
	}, [])

	const handleDeleteAppointment = () => {
		console.log('Boorando appointment')
		//*alerta para solicitar confirmacion

		// funcion que me elimine el appointment
		//axios.delete(`${rute}/appointments/${params.id}`)
	}
	console.log(appointmentDetails)

	return (
		<Suspense fallback={<h1></h1>}>
			{appointmentDetails ? (
				<div className='flex flex-col min-h-screen md:pt-8'>
					<h1 className='font-medium text-4xl lg:text-5xl'>Appointments Details</h1>
					<p>Appopintment id: {appointmentDetails.id}</p>
					<p>Parking: {appointmentDetails.parking_lot.name}</p>
					<p>Parking address{appointmentDetails.parking_lot.location}</p>
					<p>Appointment date:{appointmentDetails.date}</p>
					<p>Appointment time:{appointmentDetails.time}</p>
					<p>Appointment duration:{appointmentDetails.duration}</p>
					<p>Appointment total: {appointmentDetails.total}</p>
					<p>Appointment license plate:{appointmentDetails.license_plate}</p>
					<button onClick={handleDeleteAppointment} type='button' className='bg-red-500 text-white rounded-lg px-4 py-2 mt-4'>
						Delete Appointment
					</button>
				</div>
			) : (
				<div className='flex flex-col min-h-screen md:pt-6'>
					<h1>Loading...</h1>
				</div>
			)}
		</Suspense>
	)
}

export default AppointmentsDetails
