'use client'
import { BackToOurParkingsButton, HireButton } from '@/app/components/buttons/Buttons'
import { CheckIcon } from '@/app/components/icons/icons'
import ReservationForm from '@/app/components/reservationForm/ReservationForm'
import { Loading } from '@/app/components/suspense/Loading'
import { useAuth } from '@/app/context/AuthContext'
import { IParking } from '@/types'
import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'

const ParkingDetails = ({ params }: { params: { slug: string } }) => {
	// const formattedSlug = params.slug.replace(/%20/g, ' ')
	// const { allParkings, setAllParkings } = useAuth()
	// const foundParking = allParkings?.find((parking) => parking.name === formattedSlug)
	const [parking, setParking] = useState<IParking | undefined>(undefined)
	useEffect(() => {
		axios.get(`http://localhost:3001/parking-lot/${params.slug}`).then(({ data }) => setParking(data))
	}, [])

	// console.log('los parkings', allParkings)

	return (
		<div className='flex flex-col min-h-screen pt-24 items-center'>

			<div className='flex flex-col lg:flex-row  lg:justify-center lg:gap-40 p-4 m-0 items-center justify-start gap-4 text-center'>

				<div className='flex flex-col items-center'>
					<h1 className='font-medium text-4xl lg:text-6xl'>{parking?.name}</h1>
					<p className='text-2xl'>
						Address: <span className='italic'>{parking?.location}</span>{' '}
					</p>

					<ul className='pt-10 flex flex-col items-center '>

						<li className='flex gap-2 items-center mb-4 w-full justify-start'>
							<CheckIcon />
							<p>100% insured parking in the reservation</p>
						</li>
						<li className='flex gap-2 items-center mb-4 w-full justify-start'>
							<CheckIcon />
							<p >Security 24hr</p>
						</li>
						<li className='flex gap-2 items-center mb-4 w-full justify-start'>
							<CheckIcon />
							<p>Automated check-in and check-out</p>
						</li>
					</ul>

				</div>

				<div className='w-full lg:w-10/12 flex flex-col items-center'>

					<Suspense fallback={<Loading />}>{parking ? <ReservationForm parking={parking} /> : <Loading />}</Suspense>
				</div>
			</div>
			<div className='flex justify-center mb-4'>
				<BackToOurParkingsButton />
			</div>
		</div>
	)
}

export default ParkingDetails
