import { BackToOurParkingsButton, HireButton } from '@/app/components/buttons/Buttons'
import { CheckIcon } from '@/app/components/icons/icons'
import Navbar from '@/app/components/navbar/Navbar'
import { ParkingsMocks } from '@/app/utils/parkingsMock'
import React from 'react'

const ParkingDetails = ({ params }: { params: { slug: string } }) => {
	const parking = ParkingsMocks.find((parking) => parking.name === params.slug)
	return (
		<div className='flex flex-col min-h-screen '>
			<Navbar />
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>
				<h1>{parking?.name}</h1>
				<p>Dirección: {parking?.address}</p>
				<p>Barrio: {parking?.barrio}</p>
				<p>Lugares disponibles: {parking?.availableSlots}</p>
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
				<HireButton />
				<BackToOurParkingsButton />
			</div>
		</div>
	)
}

export default ParkingDetails
