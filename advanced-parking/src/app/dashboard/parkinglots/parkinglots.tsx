'use client'

import axios from 'axios'
import Link from 'next/link'
import { IParking } from '@/types'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingParkings from '@/app/components/suspense/LoadingParkings'
import { showSweetAlertCreatedParkinkLot } from '@/app/components/alerts/SweetAlert'

const Parkinglots = () => {

	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [observer, setObserver] = useState(0)
	const [allParkinglots, setAllParkinglots] = useState<IParking[] | null>(null)
const [searchValue, setSearchValue] = useState('')
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/parking-lot/all`, {
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
		const filteredResults =
			searchValue !== ''
				? allParkinglots?.filter((parking) => parking.location.toLowerCase().includes(searchValue.toLowerCase()) || parking.name.toLowerCase().includes(searchValue.toLowerCase()))
				: allParkinglots

	const handleSendChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.log('adding new parking lot')
		// console.log(formData)
		showSweetAlertCreatedParkinkLot(() => {
			const token = localStorage.getItem('authToken')
			axios
				.post(`${rute}/parking-lot`, formData, {
					headers: {
						Authorization: `Bearer: ${token}`
					}
				})
				.then(({ data }) => {
					// console.log(data)
					setObserver((observer) => observer + 1)
					setIsForm(false)
				})
		})
	}
	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<h1 className='text-2xl sm:text-5xl font-bold'> Parking Lots Info</h1>
			<div className='flex flex-col'>
				<Suspense fallback={<LoadingParkings />}>
					<div className='flex flex-row justify-between items-center pb-2'>
						<h3 className='flex justify-start text-md sm:text-xl font-base'>
							Total Parkings: <span className='font-bold'> {allParkinglots?.length}</span>
						</h3>
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
								<div className='flex flex-col gap-4 w-80'>
									<div className='flex flex-col'>
										<label className='font-medium' htmlFor='name'>Name</label>
										<input type='text' placeholder='e.g. Central Parking ' name='name' id='name' className='border rounded-md text-md h-7 pl-2 ' value={formData.name} onChange={handleChangeValue} />
									</div>
									<div className='flex flex-col'>
										<label className='font-medium' htmlFor='location'>Address</label>
										<input
											type='text'
											placeholder='e.g. Av. Juan XX'
											name='location'
											id='locationinput'
											className='border rounded-md h-7 pl-2 '
											onChange={handleChangeValue}
											value={formData.location}
										/>
									</div>
									<div className='flex flex-col'>
										<label className='font-medium' htmlFor='lat'>Lat</label>
										<input type='number' placeholder='e.g. 34.636989' name='lat' id='latinput' className='border rounded-md h-7 pl-2 ' onChange={handleChangeValue} value={formData.lat} />
									</div>
									<div className='flex flex-col'>
										<label className='font-medium' htmlFor='lng'>Lng</label>
										<input type='number' placeholder='e.g. 58.482000' name='lng' id='lnginput' className='border rounded-md h-7 pl-2 ' onChange={handleChangeValue} value={formData.lng} />
									</div>
									<div className='flex flex-col'>
										<label className='font-medium' htmlFor='slot_stock'>Slots stock</label>
										<input
											type='text'
											max={20}
											placeholder='e.g. 20'
											name='slot_stock'
											id='slot_stock'
											className='border rounded-md h-7 pl-2 '
											onChange={handleChangeValue}
											value={formData.slot_stock}
										/>
									</div>
									<div className='flex gap-4 mb-8'>
										<button
											type='button'
											className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-silver hover:bg-red-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
											onClick={() => {
												// console.log('reset')

												setFormData({
													name: '',
													location: '',
													lat: '',
													lng: '',
													slot_stock: ''
												})
											}}
										>
											Discard
										</button>
										<button
											type='submit'
											className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						)}
					</div>
					<input
						type='search'
						id='search'
						className='w-1/2 max-w-[350px] mb-4 p-4 ps-10 text-sm text-erieblack/80 border border-silver rounded-lg bg-ghostwhite focus:ring-2 focus:border-yaleblue'
						placeholder='Search by address or parking name'
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						required
					/>
					<table className='sm:max-w-full min-w-full table-auto w-full h-full border-collapse'>
						<thead>
							<tr>
								<th className='border p-2 text-left'>Parking name</th>
								<th className='border p-2 text-left'>Address</th>
								<th className='border p-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{filteredResults ? (
								filteredResults.map((parkinglot) => (
									<tr key={parkinglot.id} className='hover:bg-silver/20'>
										<td className='border p-2'>
											<Link href={`/dashboard/parkinglots/${parkinglot.id}`}>{parkinglot.name}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/parkinglots/${parkinglot.id}`}>{parkinglot.location}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/parkinglots/${parkinglot.id}`}>{parkinglot.status}</Link>
										</td>
									</tr>
								))
							) : (
								<LoadingParkings />
							)}
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	)
}

export default Parkinglots
