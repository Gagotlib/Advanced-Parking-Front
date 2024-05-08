import { BackToOurParkingsButton, HireButton } from '@/app/components/buttons/Buttons'
import { ParkingsMocks } from '@/app/utils/parkingsMock'
import React from 'react'

const ParkingDetails = ({ params }: { params: { slug: string } }) => {
	const parking = ParkingsMocks.find((parking) => parking.name === params.slug)
	return (
		<div className='flex flex-col min-h-screen '>
			<div className='h-16 bg-duck-yellow w-full'>ACA va estar el Navbar</div>
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>
				<h1>{parking?.name}</h1>
				<p>Dirección: {parking?.address}</p>
				<p>Barrio: {parking?.barrio}</p>
				<p>Lugares disponibles: {parking?.availableSlots}</p>
				<HireButton />
				<BackToOurParkingsButton />
			</div>
		</div>
	)
}

export default ParkingDetails
