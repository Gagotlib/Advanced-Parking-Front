'use client'

import React from 'react'
import Image from 'next/image'
import { useAuth } from '@/app/context/AuthContext'
import QRGenerator from '@/app/components/qrcode/QRGenerator'
import { BackToHomeButton } from '@/app/components/buttons/Buttons'
import { getTodayDate } from '@/app/utils/dateHelpers'

export interface IBooking {
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

function BookingDetail({ booking }: { booking: IBooking }) {
	const { user, setUser } = useAuth()
	// console.log(' booking:', booking)

	const dateToday = getTodayDate()

	return (
		<div className='sm:grid sm:grid-cols-2 items-center min-h-screen px-4 pb-10 lg:gap-40'>
			<div className='flex flex-col items-center gap-2 max-md:hidden'>
				<h1 className='font-bold text-2xl sm:text-5xl md:text-center'>Advanced Parking</h1>
				<Image src='/paymentApproved.webp' alt='Image Payment Approved' width={400} height={400} priority={true} />
			</div>
			<div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 px-6 mx-auto mt-8'>
				<h1 className='font-bold text-2xl sm:text-3xl my-4 text-center text-erieblack '>Reservation Successful</h1>
				<hr className='mb-1' />
				<div className='flex flex-col mb-2'>
					<p className='flex justify-end text-lg sm:text-2xl font-bold dark:text-erieblack/80'>Invoice </p>
					<p className='text-sm dark:text-erieblack/80'>Date: {dateToday} </p>
				</div>
				<div className='flex justify-center'>
					<QRGenerator />
				</div>
				<div className='mb-8'>
					<h2 className='text-lg font-bold mb-4'>
						Ticket To: <span className='text-erieblack/80 text-sm dark:text-erieblack/80 '>{booking.id}</span>
					</h2>
					<p className='text-erieblack/80 text-sm'>Name: {user?.name}</p>
					<p className='text-erieblack/80 text-sm'>Email: {user?.email} </p>
					<p className='text-erieblack/80 text-sm'>Parking: {booking.parking_lot.name}</p>
					<p className='text-erieblack/80 text-sm'>Slot: {booking.slot_number}</p>
					<p className='text-erieblack/80  text-sm'>Check-in date: {booking.date}</p>
					<p className='text-erieblack/80  text-sm'>Check-in hour: {booking.time}</p>
					<p className='text-erieblack/80  text-sm'>Address: {booking.parking_lot.location}</p>
				</div>
				<table className='w-full mb-8'>
					<thead>
						<tr>
							<th className='text-left font-bold text-erieblack'>License Plate</th>
							<th className='text-left font-bold text-erieblack'>Time</th>
							<th className='text-right font-bold text-erieblack'>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='text-left font-light text-erieblack/80'>{booking.license_plate}</td>
							<td className='text-left font-light text-erieblack/80'>{booking.duration} hrs</td>
							<td className='text-right font-light text-erieblack/80'>{booking.total} $</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td className='text-left font-bold text-erieblack'>Total</td>
							<td></td>
							<td className='text-right font-bold text-erieblack'>{booking.total} $</td>
						</tr>
					</tfoot>
				</table>
				<div className='flex flex-col items-center gap-3'>
					<p className='flex text-center text-xs sm:text-md text-erieblack'>Check your email. Your invoice has been sent.</p>
					<p className='flex text-center text-xs sm:text-md text-erieblack mb-4'>Thank you for using our services!</p>
				</div>
			</div>
			<div className='flex justify-center items-center pt-8 sm:hidden'>
				<BackToHomeButton />
			</div>
		</div>
	)
}

export default BookingDetail
