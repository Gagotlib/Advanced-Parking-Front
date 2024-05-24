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

	const [isForm, setIsForm] = useState(false)
	const [formData, setFormData] = useState<{ [key: string]: any }>({})
	const handleAddNewParking = () => {
		setIsForm(!isForm)
	}
	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === 'lat' || name === 'lng' || name === 'slot_stock' ? parseFloat(value) : value
		}))
	}

	const handleSendChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('adding new parking lot')
		console.log(formData)

		const token = localStorage.getItem('authToken')
		axios
			.post(`${rute}/parking-lot`, formData, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
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
					<div>
						{isForm && (
							<form onSubmit={handleSendChanges}>
								<div className='flex flex-col gap-4 w-auto'>
									<div>
										<label htmlFor='name'>Name</label>
										<input type='text' placeholder='e.g. Central Parking ' name='name' id='name' className='border rounded-md text-md h-7 ml-4' value={formData.name} onChange={handleChangeValue} />
									</div>
									<div>
										<label htmlFor='location'>Address</label>
										<input
											type='text'
											placeholder='e.g. Av. Juan XX'
											name='location'
											id='locationinput'
											className='border rounded-md h-7 ml-4'
											onChange={handleChangeValue}
											value={formData.location}
										/>
									</div>
									<div>
										<label htmlFor='lat'>Lat</label>
										<input type='number' placeholder='e.g. 34.636989' name='lat' id='latinput' className='border rounded-md h-7 ml-4' onChange={handleChangeValue} value={formData.lat} />
									</div>
									<div>
										<label htmlFor='lng'>Lng</label>
										<input type='number' placeholder='e.g. 58.482000' name='lng' id='lnginput' className='border rounded-md h-7 ml-4' onChange={handleChangeValue} value={formData.lng} />
									</div>
									<div>
										<label htmlFor='slot_stock'>Slots stock</label>
										<input
											type='text'
											max={20}
											placeholder='e.g. 20'
											name='slot_stock'
											id='slot_stock'
											className='border rounded-md h-7 ml-4'
											onChange={handleChangeValue}
											value={formData.slot_stock}
										/>
									</div>
									<button
										type='submit'
										className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
									>
										Submit
									</button>
								</div>
							</form>
						)}
					</div>

					<div className='flex flex-row font-bold pl-2 mt-4'>
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
