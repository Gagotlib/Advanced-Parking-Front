'use client'

import React, { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'
import axios from 'axios'

const Page = ({ params }: { params: { id: string } }) => {
	const [booking, setBooking] = useState(null)
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

	useEffect(() => {
		const token = localStorage.getItem('authToken')
		//! peticion al back que modifique el estado de deleted a active
		axios
			.put(
				`${rute}/appointments/success/` + params.id,
				{ status: 'active' },
				{
					headers: {
						Authorization: `Bearer: ${token}`
					}
				}
			)
			.then(() => {
				axios.get(`${rute}/appointments/` + params.id).then(({ data }) => setBooking(data))
				console.log(booking)
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<div className='flex flex-col items-center min-h-screen pt-24'>
			{/* <div className='flex items-center justify-center gap-4'>
				<h1>Approved appointment</h1>

				<CheckIcon />
			</div>

			<h3>Te llegará un email con los datos de tu reserva</h3> */}
			{booking && <BookingDetail booking={booking} />}
		</div>
	)
}

export default Page

// const { user, setUser } = useAuth()
// const [booking, setBooking] = useState<IBooking | null>(null)
// const rute = process.env.NEXT_PUBLIC_BACK_API_URL

// useEffect(() => {
// 	const fetchBooking = async () => {
// 		try {
// 			const { data } = await axios.get(`${rute}/appointments/${params.id}`)
// 			setBooking(data)
// 		} catch (error) {
// 			console.error('Error fetching booking:', error)
// 		}
// 	}

// 	const response = await fetchBooking()
// 	const bodyemail = {
// 		name: user?.name,
// 		email: user?.email,
// 		date: booking?.date,
// 		time: booking?.time,
// 		slot: booking?.slot_number,
// 		parkingLot: booking?.parking_lot.name,
// 		location: booking?.parking_lot.location
// 	}

// 	axios.post(`${rute}/email-sender/confirmed`, bodyemail).then(({ data }) => console.log(data))
// }, [params.id, rute])
