'use client'
import { BackToOurParkingsButton } from '@/app/components/buttons/Buttons'
import Maps from '@/app/components/googleMaps/Maps'
import { ReservationForm } from '@/app/components/reservationForm/ReservationForm'
import { Loading } from '@/app/components/suspense/Loading'
import LoadingMapDetail from '@/app/components/suspense/LoadingMapDetail'
import { IParking } from '@/types'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const ParkingDetails = ({ params }: { params: { slug: string } }) => {
	const pathname = usePathname()
	console.log('el pathname', pathname)
	localStorage.setItem('pathname', pathname)

	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [parking, setParking] = useState<IParking | undefined>(undefined)
	useEffect(() => {
		axios.get(`${rute}/parking-lot/${params.slug}`).then(({ data }) => setParking(data))
	}, [])

	// console.log(parking)

	return (
		<div className='flex flex-col min-h-screen pt-28 sm:pt-24 lg:pt-12 items-center lg:mr-10'>
			<div className='flex flex-col lg:flex-row lg:justify-center lg:gap-40 p-2 m-0 items-center justify-start gap-4 text-center'>
				{/* <Directions latProp={latProp} lngProp={lngProp} /> */}
				<Suspense fallback={<LoadingMapDetail />}>
					{parking ? (
						<div className='flex flex-col items-center gap-4 mt-0'>
							<h1 className='font-medium text-4xl lg:text-4xl p-0 m-0'>Parking {parking?.name}</h1>
							<p className='text-xl'>
								Address: <span className='italic'>{parking?.location}</span>{' '}
							</p>
							<Maps latProp={parseFloat(parking.lat)} lngProp={parseFloat(parking.lng)} nameProp={parking.name} />
						</div>
					) : (
						<LoadingMapDetail />
					)}
				</Suspense>
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
