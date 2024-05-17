import { useAuth } from '@/app/context/AuthContext'
import React from 'react'

interface IBooking {
	date: string
	duration: string
	id: string
	is_parked: boolean
	license_plate: string
	time: string
	slot: {
		id: string
		slot_status: string
	}
	parking_lot: {
		id: string
		location: string
		name: string
		slots_stock: number
	}
}

function BookingDetail({ booking }: { booking: IBooking }) {
	const { user, setUser } = useAuth()
	console.log(' booking:', booking)

	return (
		<div className='bg-white border rounded-lg shadow-lg px-6 py-4 max-w-md mx-auto mt-2'>
			<h1 className='font-bold text-2xl my-4 text-center text-yaleblue'>Advanced Parking</h1>
			<hr className='mb-2' />
			<div className='flex flex-col justify-between mb-6'>
				<h2 className='text-lg font-bold'>Invoice</h2>
				<div className='text-gray-700'>
					<p>Date: {booking.date}</p>
					<p>Nr: {booking.id}</p>
				</div>
			</div>
			<div className='mb-8'>
				<h2 className='text-lg font-bold mb-4'>Ticket To:</h2>
				<p className='text-gray-700 mb-2'>Name: {user?.name}</p>
				<p className='text-gray-700'>Email: {user?.email}</p>
				<br />
				<p className='text-gray-700 mb-2'>Parking: {booking.parking_lot.name}</p>
				<p className='text-gray-700 mb-2'>Slot: {booking.slot.id}</p>
				<p className='text-gray-700 mb-2'>Address: {booking.parking_lot.location}</p>
			</div>
			<table className='w-full mb-8'>
				<thead>
					<tr>
						<th className='text-left font-bold text-gray-700'>License Plate</th>
						<th className='text-left font-bold text-gray-700'>Time</th>
						<th className='text-right font-bold text-gray-700'>Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='text-left text-gray-700'>{booking.license_plate} </td>
						<td className='text-left text-gray-700'>{booking.duration} hour</td>
						<td className='text-right text-gray-700'>$10</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td className='text-left font-bold text-gray-700'>Total</td>
						<td className='text-left font-bold text-gray-700'></td>
						<td className='text-right font-bold text-gray-700'>$10.00</td>
					</tr>
				</tfoot>
			</table>
			<div className='text-gray-700 mb-10'>Thank you for using our services!</div>
		</div>
	)
}

export default BookingDetail
