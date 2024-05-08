import { BackToOurParkingsButton, HireButton } from '@/app/components/buttons/Buttons'
import { CheckIcon } from '@/app/components/icons/icons'
import ReservationForm from '@/app/components/reservationForm/ReservationForm'
import { ParkingsMocks } from '@/app/utils/parkingsMock'
import React from 'react'

const ParkingDetails = ({ params }: { params: { slug: string } }) => {
	const formattedSlug = params.slug.replace(/%20/g, ' ')

	//!peticion para qe me traiga segun el id
	const parking = ParkingsMocks.find((parking) => parking.name === formattedSlug)
	// console.log(formattedSlug)

	// peticion AL BACK EN BASE AL ID

	return (
		<div className='flex flex-col min-h-screen '>
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>
				<h1>{parking?.name}</h1>
				<p>Dirección: {parking?.location}</p>
				<p>Lugares disponibles: {parking?.slots_stock}</p>
				<p>id: {parking?.id}</p>
				<ul>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Lugar asegurado</p>
					</li>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Seguridad las 24hs</p>
					</li>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Ingreso y Salida automatizada</p>
					</li>
				</ul>
				<ReservationForm />
				<BackToOurParkingsButton />
			</div>
		</div>
	)
}

export default ParkingDetails
