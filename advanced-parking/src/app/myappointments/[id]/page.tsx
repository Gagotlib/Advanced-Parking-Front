'use client'
import React, { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'
import axios from 'axios'

const Page = ({ params }: { params: { id: string } }) => {

	const [booking, setBooking] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:3001/appointments/' + params.id).then(({ data }) => setBooking(data))
		console.log(booking)
	}, [])
	console.log(booking)

	return <div className='flex flex-col min-h-screen pt-24'>{booking && <BookingDetail booking={booking} />}</div>
}

export default Page
