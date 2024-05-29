'use client'

import { availableHours, getMaxDate, getTodayDate } from '@/app/utils/dateHelpers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LoginButton, ReserveButton } from '../buttons/Buttons'
import { useAuth } from '@/app/context/AuthContext'
import { IParking } from '@/types'
import Toast from '../alerts/Toast'
import SlotSelection from '../slotselection/SlotSelection'
import PricingRender from '../pricing/PricingRender'
import { OverlayFull, OverlayNav } from '../overlay/overlay'
import Spiner from '../spiner/Spiner'

export const ReservationForm = ({ parking }: { parking: IParking | undefined }) => {
	const { user } = useAuth()
	// console.log('usuario', user)
	// console.log('el parking', parking)
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const router = useRouter()
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [slotShow, setSlotShow] = useState(false)
	const [showOverlay, setShowOverlay] = useState(false)
	const [duration, setDuration] = useState(Array.from({ length: 10 }, (_, index) => index + 1))
	const [prices, setPrices] = useState(duration.map((hour) => hour * 3.55))
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (showToast || errorToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
				setErrorToast(false)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, errorToast])

	useEffect(() => {
		if (showToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [selectedSlot, setSelectedSlot] = useState('')

	const [formData, setFormData] = useState({
		date: localStorage.getItem('date') || getTodayDate(),
		time: localStorage.getItem('time') || '08:00',
		parkingLotId: parking?.id,
		user_id: user?.id,
		license_plate: localStorage.getItem('license_plate') || '',
		duration: localStorage.getItem('duration') || '1',
		is_parked: false,
		total: 3.55,
		slot_number: selectedSlot
	})

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			slot_number: selectedSlot
		}))
	}, [selectedSlot])

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			total: 3.55 * Number(formData.duration)
		}))
	}, [formData.duration])

	function handleInputChange(event: any) {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
		localStorage.setItem(`${name}`, value)

		// setErrors(validateNewAppointment(formData))
	}
	//! funciones correspondientes a los slots
	const handleShowSelectSlot = () => {
		setSlotShow(!slotShow)
		setShowOverlay(!showOverlay)
	}

	async function handleSubmit(event: any) {
		event.preventDefault()
		setIsLoading(true)

		if (formData.slot_number === null) {
			return
		}
		//! control
		// console.log('Esto es todo el formData', formData)
		// console.log(typeof formData.date)

		try {
			//! enviar info al backend
			//!creamos el appointment
			const responseAppointment = await axios.post(`${rute}/appointments`, formData)
			const appointment_id = responseAppointment.data.id
			// console.log('la id del appointment creado', appointment_id)

			//!enviamos al pago
			const bodyreq = { type_of_service: 'One time payment', unit_amount: formData.total, appointment_id: appointment_id }
			const token = process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY
			// console.log('el token de stripe', token)

			const response = await axios.post(`${rute}/payment/create-checkout-session`, bodyreq, {
				headers: {
					'stripe-signature': token
				}
			})
			// console.log('la respuesta del pago:', response.data.url)
			const url = response.data.url //! url que devuelve la creacion de la solicitud
			setIsLoading(false)
			setShowToast(true)
			localStorage.removeItem("date")
			localStorage.removeItem("time")
			localStorage.removeItem("duration")
			localStorage.removeItem("license_plate")
			setFormData({
				date: getTodayDate(),
				time: '08:00',
				parkingLotId: parking?.id,
				user_id: user?.id,
				license_plate: '',
				duration: '1',
				is_parked: false,
				total: 3.55,
				slot_number: ""
			})
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push(`${url}`)
			}, 3000)
		} catch (error) {
			console.log(error)
			setErrorToast(true)
			setIsLoading(false)
		}
	}

	const isFormValid = formData.date && formData.time && formData.license_plate && selectedSlot

	return (
		<div className='w-10/12 flex flex-col items-center text-erieblack dark:text-ghostwhite pt-12 sm:pt-0'>
			{showToast && <Toast message='Redirecting to the payment' type='success' />}
			{errorToast && <Toast message='Reservation error. Please try again or contact our support team' type='error' />}
			<h1 className='font-medium text-4xl lg:text-4xl lg:pt-12'> Booking</h1>

			<form className='flex flex-wrap flex-col justify-center lg:justify-start items-center gap-4 text-center border-2 border-silver/80 rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
				<div className='flex items-center justify-center gap-3'>
					<label htmlFor='date' className='font-bold text-sm sm:text-lg'>
						Select date:
					</label>
					<input
						type='date'
						name='date'
						id='date'
						value={formData.date}
						min={getTodayDate()}
						max={getMaxDate()}
						onChange={handleInputChange}
						required
						pattern='\d{4}-\d{2}-\d{2}'
						className='bg-ghostwhite/50 border border-silver/80 text-erieblack text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Select date'
					/>
				</div>

				<div className='flex items-center justify-center gap-3'>
					<label htmlFor='time' className='block mb-2 text-sm lg:text-lg font-bold'>
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
				<div className='flex justify-around gap-4'>
					<button
						type='button'
						className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ringz-4 focus:outline-none'
						onClick={handleShowSelectSlot}
					>
						Pick your slot
					</button>
					<p className='text-md font-normal'>
						Nro: <span className='font-semibold underline decoration-yaleblue dark:decoration-silver'>{selectedSlot}</span>
					</p>
				</div>
				<div>
					<label htmlFor='license_plate'>License plate:</label>
					<input
						id='license_plate'
						name='license_plate'
						value={formData.license_plate}
						className='block w-full p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite text-center'
						onChange={handleInputChange}
						placeholder='XXXXXXXXX'
						required
					></input>
				</div>
				{showOverlay && <OverlayFull />}
				{slotShow && (
					<SlotSelection
						setShowOverlay={setShowOverlay}
						selectedSlot={selectedSlot}
						setSelectedSlot={setSelectedSlot}
						setSlotShow={setSlotShow}
						parking={parking}
						date={formData.date}
						time={formData.time}
						duration={formData.duration}
					/>
				)}
				{!user ? (
					<div className='flex flex-col items-center'>
						<p className='text-erieblack dark:text-ghostwhite text-sm sm:text-lg m-2'>
							You must be <span className='font-semibold text-yaleblue dark:text-silver'>logged</span> in to book
						</p>
						<LoginButton />
					</div>
				) : (
					<div className='flex justify-center items-center gap-6'>
						<div>
							<p className='text-sm sm:text-md font-bold'>
								Total to pay: <span className='text-sm sm:text-md font-light'> {(parseInt(formData.duration) * 3.55).toFixed(2)} $</span>
							</p>
						</div>
						<div>
							<button
								type='submit'
								className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg ${isFormValid ? 'bg-yaleblue hover:bg-yaleblue/90' : 'bg-gray-400 cursor-not-allowed'
									} sm:w-fit focus:ring-4 focus:outline-none`}
								disabled={!isFormValid}
							>
								{isLoading ? <Spiner /> : 'Reserve'}
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}
