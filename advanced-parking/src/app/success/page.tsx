'use client'
import React, { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'
import axios from 'axios'

const Page = () => {
	const [booking, setBooking] = useState(null)

	// useEffect(() => {
	// 	axios.get('http://localhost:3001/appointments/' + params.id).then(({ data }) => setBooking(data))
	// 	console.log(booking)
	// }, [])
	// console.log(booking)

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<h1>Reserva Confirmada! </h1>
			<h3>Te llegará un email con los datos de tu reserva</h3>
			{booking && <BookingDetail booking={booking} />}
		</div>
	)
}

export default Page
