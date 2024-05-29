'use client'

import axios from 'axios'
import Link from 'next/link'
import { IParking, IUser } from '@/types'
import { useRouter } from 'next/navigation'
import Spiner from '@/app/components/spiner/Spiner'
import { OverlayFull } from '@/app/components/overlay'
import Slotselection from '@/app/components/slotselection'
import React, { Suspense, useEffect, useState } from 'react'
import { getMaxDate, getTodayDate } from '@/app/utils/dateHelpers'
import PricingRender from '@/app/components/pricing/PricingRender'
import { showSweetAlertCreatedAppointment } from '@/app/components/alerts/SweetAlert'

export interface IAppointment {
	date: string
	duration: string
	id: string
	is_parked: boolean
	license_plate: string
	slot: {
		id: string
		parking_lot: {
			id: string
			lat: string
			lng: string
			location: string
			name: string
			slots_stock: number
		}
		slot_number: number
		slot_status: string
	}
	slot_number: string
	status: string
	time: string
	total: number
	user: {
		email: string
		id: string
		image: string
		name: string
		password: string
		phone: string
		role: string
		status: string
	}
}

export const Appointments = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

	const cardLimit = 100
	const router = useRouter()
	const [page, setPage] = useState(1)
	const [observer, setObserver] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const [allAppointments, setAllAppointments] = useState<IAppointment[] | null>(null)



	useEffect(() => {
		const token = localStorage.getItem('authToken')
		// console.log(token);
		axios
			.get(`${rute}/appointments?page=${page}&limit=${cardLimit}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				const sortedAppointments = data.sort((a: IAppointment, b: IAppointment) => new Date(b.date).getTime() - new Date(a.date).getTime())
				setAllAppointments(sortedAppointments)
			})
	}, [observer])

	const [allUsers, setAllUsers] = useState<IUser[] | null>(null)
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllUsers(data)
			})
	}, [])

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
	}, [])

	const handleRefresh = () => {
		setObserver((observer) => observer + 1)
	}

	const [selectedSlot, setSelectedSlot] = useState('1')
	const [isFormShow, setIsFormShow] = useState(false)
	const [slotShow, setSlotShow] = useState(false)
	const [showOverlay, setShowOverlay] = useState(false)
	const [formData, setFormData] = useState({
		date: getTodayDate(),
		time: '08:00',
		parkingLotId: '',
		user_id: '',
		license_plate: '',
		duration: '1',
		is_parked: false,
		total: 3.55,
		slot_number: selectedSlot,
		status: 'active'
	})

	const showNewAppForm = () => {
		setIsFormShow(!isFormShow)
	}

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
		setFormData((prevFormData) => ({
			...prevFormData,
			slot_number: selectedSlot
		}))
		// console.log(formData)
	}

	const handleCreateNewAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		showSweetAlertCreatedAppointment(() => {
			setIsLoading(true)
			// console.log(formData)
			try {
				// const response =  
				axios
					.post(`${rute}/appointments`, formData)
				// console.log(response)
				setIsLoading(false)
				setObserver((observer) => observer + 1)
				setIsFormShow(false)
			} catch (error) {
				console.log(error)
				setIsLoading(false)
			}
		})
	}

	const handleShowSelectSlot = () => {
		setSlotShow(!slotShow)
		setShowOverlay(!showOverlay)
	}

	const isFormValid = formData.date && formData.time && formData.license_plate && formData.duration && formData.parkingLotId && formData.slot_number

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl sm:text-5xl font-bold'> Appointments Info</h1>
				<button type='button' onClick={handleRefresh} className='px-4 py-2 h-10 bg-yaleblue text-ghostwhite rounded hover:bg-yaleblue/80'>
					Refresh
				</button>
			</div>
			<div className='flex flex-col '>
				<Suspense fallback={<p>Loading...</p>}>
					<button
						type='button'
						className='py-2 mb-4 px-2 w-fit text-base font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite  focus:ring-2'
						onClick={showNewAppForm}
					>
						Create new appointment
					</button>
					{isFormShow && (
						<div>
							<form onSubmit={handleCreateNewAppointment} className='flex flex-col gap-4'>
								<div className='flex'>
									<label htmlFor='userid' className='font-bold text-md sm:text-lg'>
										Select User:
									</label>
									<select
										name='user_id'
										id='userinput'
										className='bg-ghostwhite/50 border border-silver/80 text-erieblack text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto ml-4 ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										value={formData.user_id}
										onChange={(e) => handleInputChange(e)}
									>
										{allUsers &&
											allUsers.map((user) => (
												<option key={user.id} value={user.id}>
													{user.name}
												</option>
											))}
									</select>
								</div>
								<div className='flex'>
									<label htmlFor='parkingLotId' className='font-bold text-md sm:text-lg'>
										Select Parking:
									</label>
									<select
										name='parkingLotId'
										id='parkingidinput'
										className='bg-ghostwhite/50 border border-silver/80 text-erieblack text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto ml-4 ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										value={formData.parkingLotId}
										onChange={(e) => handleInputChange(e)}
									>
										{allParkinglots &&
											allParkinglots.map((parkinglot) => (
												<option key={parkinglot.id} value={parkinglot.id}>
													{parkinglot.name}
												</option>
											))}
									</select>
								</div>
								<div className='flex  gap-3'>
									<label htmlFor='date' className='font-bold text-md sm:text-lg'>
										Select date:
									</label>
									<input
										type='date'
										name='date'
										id='date'
										value={formData.date}
										min={getTodayDate()}
										max={getMaxDate()}
										onChange={(e) => handleInputChange(e)}
										required
										pattern='\d{4}-\d{2}-\d{2}'
										className='bg-ghostwhite/50 border border-silver/80 text-erieblack text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='Select date'
									/>
								</div>
								<div className='flex gap-3'>
									<label htmlFor='time' className='block mb-2 text-md sm:text-lg font-bold'>
										Select time:
									</label>
									<div className='relative'>
										<div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
											<svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
												<path
													fillRule='evenodd'
													d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='time'
											name='time'
											id='time'
											step='1800'
											value={formData.time}
											onChange={handleInputChange}
											required
											className='bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
								</div>
								<div className='block pb-2'>
									<span className='text-sm text-center font-semibold'>Select Parking Duration</span>
									<PricingRender duration={parseInt(formData.duration)} setFormData={setFormData} />
								</div>

								<div className='flex  gap-4'>
									<button
										type='button'
										className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ringz-4 focus:outline-none'
										onClick={handleShowSelectSlot}
									>
										Pick your slot
									</button>
									<p className='text-md font-normal'>
										Nro: <span className='font-semibold underline decoration-yaleblue'>{selectedSlot}</span>
									</p>
									{showOverlay && <OverlayFull />}
									{slotShow && (
										<div className='absolute flex flox-row w-full h-full -right-14 -top-96 md:-right-36 lg:top-20 lg:right-10 '>
											<Slotselection
												setShowOverlay={setShowOverlay}
												selectedSlot={selectedSlot}
												setSelectedSlot={setSelectedSlot}
												setSlotShow={setSlotShow}
												parking={allParkinglots?.find((parkinglot) => parkinglot.id === formData.parkingLotId)}
												date={formData.date}
												time={formData.time}
												duration={formData.duration}
											/>
										</div>
									)}
								</div>
								<div>
									<label htmlFor='license_plate' className='block mb-2 text-md lg:text-lg font-bold'>
										License plate:
									</label>
									<input
										id='license_plate'
										name='license_plate'
										value={formData.license_plate}
										className='block  p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite focus:ring-blue-500 focus:border-blue-500 text-center'
										onChange={handleInputChange}
										placeholder='AAA-000'
										required
									></input>
								</div>

								<button type='submit' className='py-2 px-4 w-fit text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ringz-4 focus:outline-none'>
									{isLoading ? <Spiner /> : 'Reserve'}
								</button>
							</form>
						</div>
					)}
					<h3 className='flex justify-start text-md sm:text-xl font-base my-4'>
						Total appointments: <span className='font-bold'>{allAppointments?.length}</span>
					</h3>
					<table className='sm:max-w-full min-w-full table-auto w-full h-full border-collapse'>
						<thead>
							<tr>
								<th className='border p-2 text-left'>Parking</th>
								<th className='border p-2 text-left'>Date</th>
								<th className='border p-2 text-left'>User</th>
								<th className='border p-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{allAppointments ? (
								allAppointments.map((appointment) => (
									<tr key={appointment.id} className='hover:bg-silver/20'>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>{appointment.slot.parking_lot.name}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>{appointment.date}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>{appointment.user.name}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/appointments/${appointment.id}`}>{appointment.status}</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} className='border p-2 text-center'>
										Loading...
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	)
}

export default Appointments
