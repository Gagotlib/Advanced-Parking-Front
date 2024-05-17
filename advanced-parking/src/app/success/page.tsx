'use client'
import React, { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'
import axios from 'axios'
import { CheckIcon } from '../components/icons/icons'

const Page = ({ params }: { params: { id: string } }) => {
	const [booking, setBooking] = useState(null)
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

	useEffect(() => {
		axios.get(`${rute}/appointments/` + params.id).then(({ data }) => setBooking(data))
		console.log("booking:", booking)
	}, [])
	console.log('booking:', booking)

	return (
		<div className='flex flex-col items-center min-h-screen pt-24'>
			<div className='flex items-center justify-center gap-4'>
				<h1>Approved appointment</h1>

				<CheckIcon />
			</div>

			<h3>Te llegará un email con los datos de tu reserva</h3>
			{booking && <BookingDetail booking={booking} />}
		</div>
	)
}

export default Page
