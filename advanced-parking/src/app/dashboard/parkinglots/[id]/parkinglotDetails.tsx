'use client'
import { IParking } from '@/types'
import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'
import clsx from 'clsx'

const ParkingDetails = ({ params }: { params: { id: string } }) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [observer, setObserver] = useState(0)
	const [parking, setParking] = useState<IParking | undefined>(undefined)
	const [isEditInput, setIsEditInput] = useState(false)
	useEffect(() => {
		axios.get(`${rute}/parking-lot/${params.id}`).then(({ data }) => setParking(data))
	}, [observer])
	// console.log('parking', parking)

	const handleCreateSlot = () => {
		// solicitud al back
		const parkingLotId = params.id
		const token = localStorage.getItem('authToken')
		axios
			.post(
				`${rute}/slot`,
				{ parking_lot_id: parkingLotId },
				{
					headers: {
						Authorization: `Bearer: ${token}`
					}
				}
			)
			.then((response) => {
				setObserver((observer) => observer + 1)
			})
	}

	const handleChangeStatus = (e: any, slot_id: any) => {
		const token = localStorage.getItem('authToken')
		const newValue = e.target.value
		if (newValue === 'change status') return
		axios
			.put(
				`${rute}/slot/${slot_id}`,
				{ slot_status: newValue },
				{
					headers: {
						Authorization: `Bearer: ${token}`
					}
				}
			)
			.then((response) => {
				console.log(response)

				setObserver((observer) => observer + 1)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	const parkingSlots = parking?.slot.sort((a, b) => a.slot_number - b.slot_number)

	const handleShowEdit = () => {
		setIsEditInput(!isEditInput)
	}
	const [formData, setFormData] = useState<{ [key: string]: any }>({})

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === 'lat' || name === 'lng' ? parseFloat(value) : value
		}))
	}
	//-34.63407057413574, -58.48206948050081
	const handleSendChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('fomrdata:', formData)

		//* solicitud al back con el formulario de los cambios
		const token = localStorage.getItem('authToken')
		axios
			.put(`${rute}/parking-lot/${params.id}`, formData, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then((response) => {
				console.log(response)
			})
		setFormData({})
		setIsEditInput(false)
		setObserver((observer) => observer + 1)
	}

	const handleDeleteParking = () => {
		const token = localStorage.getItem('authToken')
		//* peticion al back que borre el parking
		axios
			.delete(`${rute}/parking-lot/${params.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then((response) => {
				console.log(response)
			})
	}

	return (
		<Suspense fallback={<h1></h1>}>
			{parking ? (
				<div className='flex flex-col min-h-screen md:pt-6'>
					<h1 className='font-medium text-4xl lg:text-5xl'>Parking Details</h1>

					<div className='flex items-center gap-6'>
						<h2>Name: {parking?.name}</h2>
						{isEditInput && (
							<form onSubmit={handleSendChanges} className='flex border rounded-xl h-10 '>
								<input type='text' name='name' id='nameinput' className='text-md rounded-l-xl' onChange={handleChangeValue} value={formData.name} />
								<button type='submit' className='px-4 hover:bg-gray-200 rounded-r-xl'>
									Send
								</button>
							</form>
						)}
					</div>
					<div className='flex items-center gap-6'>
						<h2>Address: {parking?.location}</h2>
						{isEditInput && (
							<form onSubmit={handleSendChanges} className='flex border rounded-xl h-10 '>
								<input type='text' name='location' id='locationinput' className='text-md rounded-l-xl' onChange={handleChangeValue} value={formData.location} />
								<button type='submit' className='px-4 hover:bg-gray-200 rounded-r-xl'>
									Send
								</button>
							</form>
						)}
					</div>
					<div className='flex items-center gap-6'>
						<h2>Latitude: {parking?.lat}</h2>
						{isEditInput && (
							<form onSubmit={handleSendChanges} className='flex border rounded-xl h-10 '>
								<input type='number' name='lat' id='latinput' className='text-md rounded-l-xl' onChange={handleChangeValue} value={formData.lat} />
								<button type='submit' className='px-4 hover:bg-gray-200 rounded-r-xl'>
									Send
								</button>
							</form>
						)}
					</div>
					<div className='flex items-center gap-6'>
						<h2>Longitude: {parking?.lng}</h2>
						{isEditInput && (
							<form onSubmit={handleSendChanges} className='flex border rounded-xl h-10 '>
								<input type='number' name='lng' id='lnginput' className='text-md rounded-l-xl' onChange={handleChangeValue} value={formData.lng} />
								<button type='submit' className='px-4 hover:bg-gray-200 rounded-r-xl'>
									Send
								</button>
							</form>
						)}
					</div>
					<button
						type='button'
						className=' py-2 px-2 w-20 h-10 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-blue-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
						onClick={handleShowEdit}
					>
						Edit
					</button>
					<h2>Parking slots:{parking?.slot.length}</h2>
					<h2>Available slots:{parking.slots_stock} </h2>
					<button
						type='button'
						className='mb-4 py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
						onClick={handleCreateSlot}
					>
						Create new Slot
					</button>
					{parkingSlots?.map((slot) => {
						return (
							<div key={slot.id} className='flex flex-row gap-8 items-center '>
								<p className='w-36'>Slot number : {slot.slot_number}</p>
								<p className='w-48'>
									Slot status:
									<span
										className={clsx('', {
											'text-green-500': slot.slot_status === 'available',
											'text-orange-500': slot.slot_status === 'reserved',
											'text-red-500': slot.slot_status === 'unavailable'
										})}
									>
										{slot.slot_status}
									</span>
								</p>
								<select
									onChange={(e) => handleChangeStatus(e, slot.id)}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								>
									<option value='change status'>change status</option>
									<option value='available'>available</option>
									<option value='unavailable'>unavailable</option>
									<option value='reserved'>reserved</option>
								</select>
							</div>
						)
					})}

					<button
						type='button'
						className='mt-10 py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-silver hover:bg-red-600 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
						onClick={handleDeleteParking}
					>
						Delete Parking
					</button>
				</div>
			) : (
				<div className='flex flex-col min-h-screen md:pt-6'>
					<h1>Loading...</h1>
				</div>
			)}
		</Suspense>
	)
}

export default ParkingDetails
