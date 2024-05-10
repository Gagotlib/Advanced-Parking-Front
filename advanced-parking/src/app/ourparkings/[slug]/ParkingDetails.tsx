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
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-40 p-4 m-0 items-center justify-start gap-4 text-center'>
				<div>
					<h1 className='font-medium text-4xl lg:text-6xl'>{parking?.name}</h1>
					<p className='text-2xl'>Address: <span className='italic'>{parking?.location}</span> </p>
					<ul className='pt-10'>
						<li className='flex gap-2 items-center mb-4'>
							<CheckIcon />
							<p>100% insured parking in the reservation</p>
						</li>
						<li className='flex gap-2 items-center mb-4'>
							<CheckIcon />
							<p>Security 24hr</p>
						</li>
						<li className='flex gap-2 items-center mb-4'>
							<CheckIcon />
							<p>Automated check-in and check-out</p>
						</li>
					</ul>
				</div>
				<div>
					<ReservationForm />
				</div>
			</div>
			<div className='flex justify-center mb-4'>
				<BackToOurParkingsButton />
			</div>
		</div>
	)
}

export default ParkingDetails
