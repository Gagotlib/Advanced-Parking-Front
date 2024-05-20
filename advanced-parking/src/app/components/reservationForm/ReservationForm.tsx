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

	// useEffect(() => {
	// 	const initialValues = {
	// 		date: localStorage.getItem('date') || getTodayDate(),
	// 		time: localStorage.getItem('time') || '08:00',
	// 		license_plate: localStorage.getItem('license_plate') || '',
	// 		duration: localStorage.getItem('duration') || '1'
	// 	}
	// })
	const [selectedSlot, setSelectedSlot] = useState('1')

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
		if (formData.slot_number === null) {
			return
		}
		//! control
		console.log('Esto es todo el formData', formData)

		try {
			//! enviar info al backend
			//!creamos el appointment
			const responseAppointment = await axios.post(`${rute}/appointments`, formData)
			const appointment_id = responseAppointment.data.id

			//!enviamos al pago
			const bodyreq = { type_of_service: 'One time payment', unit_amount: formData.total, appointment_id: appointment_id }
			const token = process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY
			console.log('el token de stripe', token)

			const response = await axios.post(`${rute}/payment/create-checkout-session`, bodyreq, {
				headers: {
					'stripe-signature': token
				}
			})
			console.log('la respuesta del pago:', response.data.url)
			const url = response.data.url //! url que devuelve la creacion de la solicitud

			setShowToast(true)
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push(`${url}`)
			}, 3000)
			// console.log(response)

			// Limpiar el formulario
			// setFormData({
			// 	date: getTodayDate(),
			// 	time: '08:00',
			// 	parkingLotId: parking?.id,
			// 	user_id: user?.id,
			// 	license_plate: '',
			// 	duration: '1',
			// 	is_parked: false,
			// 	total: 3.55,
			// 	slot: null
			// })
			// localStorage.removeItem('date')
			// localStorage.removeItem('time')
			// localStorage.removeItem('license_plate')
			// localStorage.removeItem('duration')
			// localStorage.removeItem('pathname')
			// localStorage.removeItem('total')
		} catch (error) {
			console.log(error)
			setErrorToast(true)
		}
	}

	return (
		<div className='w-10/12 flex flex-col items-center text-erieblack'>
			{showToast && <Toast message='Redirecting to the payment' type='success' />}
			{errorToast && <Toast message='Reservation error. Please try again or contact our support team' type='error' />}
			<h1 className='font-medium text-4xl lg:text-6xl'> Booking</h1>

			<form className='flex flex-wrap flex-col justify-center lg:justify-start items-center gap-4 text-center border-2 border-silver/80 rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
				<div className=''>
					<label htmlFor='date'>Date:</label>
					<input type='date' name='date' id='date' value={formData.date} min={getTodayDate()} max={getMaxDate()} onChange={handleInputChange} required pattern='\d{4}-\d{2}-\d{2}' />

					{/* {errors.date && <p className='text-red-500'>{errors.date}</p>} */}
				</div>
				<div className=''>
					<label htmlFor='time' className='font-bold'>
						Time:{' '}
					</label>
					<input type='time' name='time' id='time' step={'1800'} value={formData.time} onChange={handleInputChange} required />
				</div>

				<div className='block pb-2'>
					<span className='text-sm text-center font-semibold'>Select Parking Duration</span>
					<PricingRender duration={parseInt(formData.duration)} setFormData={setFormData} />
				</div>
				<div className='flex justify-around gap-4'>
					<button
						type='button'
						className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
						onClick={handleShowSelectSlot}
					>
						Pick your slot
					</button>
					<p className='text-md font-normal'>
						Nro: <span className='font-semibold underline decoration-yaleblue'>{selectedSlot}</span>
					</p>
				</div>
				<div className=''>
					<label htmlFor='license_plate'>License plate:</label>
					<input
						id='license_plate'
						name='license_plate'
						value={formData.license_plate}
						className='block w-full p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite focus:ring-blue-500 focus:border-blue-500 text-center'
						onChange={handleInputChange}
						placeholder='AAA-000'
						required
					></input>
				</div>
				{showOverlay && <OverlayFull />}
				{slotShow && <SlotSelection setShowOverlay={setShowOverlay} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setSlotShow={setSlotShow} />}
				{!user ? (
					<div className='flex flex-col items-center'>
						<p className='text-erieblack text-sm sm:text-lg m-2'>
							You must be <span className='font-semibold'>logged</span> in to book
						</p>
						<LoginButton />
					</div>
				) : (
					<div className='flex justify-center items-center gap-6'>
						<div>
							<p className='text-sm sm:text-md font-bold'>
								Total to pay: <span className='text-sm sm:text-md font-light'> {(parseInt(formData.duration) * 3.55).toFixed(2)} €</span>
							</p>
						</div>
						<div>
							<button type='submit' className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none'>
								Reserve
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}
