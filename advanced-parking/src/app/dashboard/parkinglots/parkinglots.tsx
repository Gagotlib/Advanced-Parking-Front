'use client'
import LoadingParkings from '@/app/components/suspense/LoadingParkings'
import { IParking } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

const Parkinglots = () => {
	const [observer, setObserver] = useState(0)
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allParkinglots, setAllParkinglots] = useState<IParking[] | null>(null)
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/parking-lot`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllParkinglots(data)
			})
	}, [observer])

	const handleAddNewParking = () => {
		console.log('adding new parking lot')
		const token = localStorage.getItem('authToken')
		axios
			.post(
				`${rute}/parking-lot`,
				{ name: 'Parque', location: 'santander 1254', lat: -34.635907, lng: -58.437973, slot_stock: 0 },
				{
					headers: {
						Authorization: `Bearer: ${token}`
					}
				}
			)
			.then(({ data }) => {
				console.log(data)
				setObserver((observer) => observer + 1)
			})
	}

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<h1>These are all the Parkings</h1>
			<div className='flex flex-col'>
				<Suspense fallback={<LoadingParkings />}>
					<div className='flex flex-row justify-between items-center'>
						<h2>Total of Parkings: {allParkinglots?.length}</h2>
						<button
							type='button'
							className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
							onClick={handleAddNewParking}
						>
							Add new Parking
						</button>
					</div>
					<div className='flex flex-row font-bold pl-2'>
						<div className='flex '>
							<p className='w-60 mr-4'>Parking name </p>
							<p>Address </p>
						</div>
					</div>
					{allParkinglots ? (
						allParkinglots.map((parkinglot) => (
							<Link key={parkinglot.id} href={`/dashboard/parkinglots/${parkinglot.id}`} className='flex flex-row gap-4 border border-1 p-2 hover:bg-slate-200'>
								<p className='w-60'>{parkinglot.name}</p>
								<p>{parkinglot.location}</p>
							</Link>
						))
					) : (
						<LoadingParkings />
					)}
				</Suspense>
			</div>
		</div>
	)
}

export default Parkinglots
