'use client'
import { BackToOurParkingsButton } from '@/app/components/buttons/Buttons'
import Maps from '@/app/components/googleMaps/Maps'
import { ReservationForm } from '@/app/components/reservationForm/ReservationForm'
import { Loading } from '@/app/components/suspense/Loading'
import { useAuth } from '@/app/context/AuthContext'
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

	return (
		<div className='flex flex-col min-h-screen pt-24 items-center'>
			<div className='flex flex-col lg:flex-row lg:justify-center lg:gap-40 p-4 m-0 items-center justify-start gap-4 text-center'>
				<Suspense fallback={<Loading />}>
					{parking ? (
						<div className='flex flex-col items-center gap-4 mt-4'>
							<h1 className='font-medium text-4xl lg:text-6xl p-0 m-0'>Parking {parking?.name}</h1>
							<p className='text-xl'>
								Address: <span className='italic'>{parking?.location}</span>{' '}
							</p>
							<Maps />
						</div>
					) : (
						<Loading />
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
