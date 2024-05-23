import React from 'react'

interface IApointment {
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
	slot_number: string
	status: string
	time: string
	total: number
}

interface BookingsUserProps {
	userAppointments: IApointment[] | null
}

const BookingsUser: React.FC<BookingsUserProps> = ({ userAppointments }) => {

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
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{userAppointments?.map((appointment: IApointment) => (

							<tr key={appointment.id} className='bg-ghostwhite'>
								<th scope='row' className='px-3 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack'>
									{appointment.parking_lot?.name}
								</th>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.date}</td>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.time}</td>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.license_plate}</td>
								<td className='px-3 py-4 border border-erieblack/90'>{appointment.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BookingsUser
