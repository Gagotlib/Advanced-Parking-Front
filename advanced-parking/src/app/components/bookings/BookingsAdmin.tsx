import Link from 'next/link'
import React from 'react'

interface IApointment {
	id: string
	parkingLot: string
	date: string
	hour: string
	licensePlate: string
}

function BookingsAdmin({ userAppointments }: any) {
	// Traer la informacion del back segun la interfaces de reservas y luego mapearla en los scope necesarios

	return (
		<div className='flex flex-col'>
			<div>
				<h1 className='font-bold text-4xl'>Bookings</h1>
			</div>
			<div className='relative overflow-x-auto'>
				<table className='w-full text-center text-erieblack table-auto border-collapse border border-erieblack/90'>
					<thead className='text-xs text-erieblack font-bold uppercase md:text-md bg-silver'>
						<tr>
							<th scope='col' className='px-6 py-2 border border-erieblack/90'>
								Parking Lot
							</th>
							<th scope='col' className='px-6 py-2 border border-erieblack/90'>
								Date
							</th>
							<th scope='col' className='px-6 py-2 border border-erieblack/90'>
								Hour
							</th>
							<th scope='col' className='px-6 py-2 border border-erieblack/90'>
								License Plate
							</th>
							<th scope='col' className='px-6 py-2 border border-erieblack/90'>
								Details
							</th>
						</tr>
					</thead>
					<tbody>
						{userAppointments?.map((appointment: any) => (
							<tr key={appointment.id} className='bg-ghostwhite'>
								<th scope='row' className='px-3 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack'>
									{appointment.parking_lot?.name}
								</th>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.date}</td>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.time}</td>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.license_plate}</td>
								<td>
									<Link href={`/dashboard/appointments/${appointment.id}`}>
										<button type='button' className='py-3 px-3 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none'>
											View Details
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
export default BookingsAdmin
