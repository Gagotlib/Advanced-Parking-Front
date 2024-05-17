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

export const ReservationForm = ({ parking }: { parking: IParking | undefined }) => {
	const { user } = useAuth()
	// console.log('usuario', user)
	// console.log('el parking', parking)
	const rute = process.env.NEXT_API_URL
	const router = useRouter()
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [slotShow, setSlotShow] = useState(false)

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

	useEffect(() => {
		const initialValues = {
			date: localStorage.getItem('date') || getTodayDate(),
			time: localStorage.getItem('time') || '08:00',
			license_plate: localStorage.getItem('license_plate') || '',
			duration: localStorage.getItem('duration') || 1
		}
	})

	const [formData, setFormData] = useState({
		date: localStorage.getItem('date') || getTodayDate(),
		time: localStorage.getItem('time') || '08:00',
		parkingLotId: parking?.id,
		user_id: user?.id,
		license_plate: localStorage.getItem('license_plate') || '',
		duration: localStorage.getItem('duration') || 1,
		is_parked: false
	})

	function handleInputChange(event: any) {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
		localStorage.setItem(`${name}`, value)

		// setErrors(validateNewAppointment(formData))
	}

	async function handleSubmit(event: any) {
		event.preventDefault()

		//! control
		console.log('Fecha seleccionada:', formData.date)
		console.log('Hora seleccionada:', formData.time)
		console.log('Parking:', formData.parkingLotId)
		console.log('license plate:', formData.license_plate)
		console.log('El userid:', formData.user_id)
		console.log('El nombredel usuario:', user?.name)

		try {
			//! enviar info al backend
			//!creamos el appointment
			const responseAppointment = await axios.post(`${rute}/appointments`, formData)
			const appointment_id = responseAppointment.data.id

			//!enviamos al pago
			const bodyreq = { type_of_service: 'One time payment', unit_amount: 10, appointment_id: appointment_id }
			const token = process.env.STRIPE_PRIVATE_KEY
			const response = await axios.post(`${rute}/payment/create-checkout-session`, bodyreq, {
				headers: {
					'stripe-signature': token
				}
			})
			console.log(response.data.url)
			const url = response.data.url //! url que devuelve la creacion de la solicitud

			setShowToast(true)
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push(`${url}`)
			}, 3000)
			// console.log(response)

			// Limpiar el formulario
			setFormData({
				date: getTodayDate(),
				time: '08:00',
				parkingLotId: parking?.id,
				user_id: user?.id,
				license_plate: '',
				duration: '1',
				is_parked: false
			})
		} catch (error) {
			console.log(error)
			setErrorToast(true)
		}
	}

	//! funciones correspondientes a los slots
	const handleShowSelectSlot = () => {
		setSlotShow(!slotShow)
	}
	const [selectedSlot, setSelectedSlot] = useState(null)

	return (
		<div className='w-10/12 flex flex-col items-center'>
			{showToast && <Toast message='Being redirect to payment' type='success' />}
			{errorToast && <Toast message='Reservation Error' type='error' />}
			<h1 className='font-medium text-4xl lg:text-6xl'> Booking</h1>

			<form className='flex flex-wrap flex-col justify-center lg:justify-start items-center gap-4 text-center border-2 border-silver/80 rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
				<div className=''>
					<label htmlFor='date'>Date:</label>
					<input type='date' name='date' id='date' value={formData.date} min={getTodayDate()} max={getMaxDate()} onChange={handleInputChange} required pattern='\d{4}-\d{2}-\d{2}' />
					{/* {errors.date && <p className='text-red-500'>{errors.date}</p>} */}
				</div>
				<div className=''>
					<label htmlFor='time'>Time: </label>
					<input type='time' name='time' id='time' step={'1800'} value={formData.time} onChange={handleInputChange} required />
				</div>
				<div className='block'>
					<label htmlFor='duration'>How many hours are you staying?</label>
					<input type='number' name='duration' id='duration' value={formData.duration} onChange={handleInputChange} required min='1' className='border rounded-md w-14 ml-2' />
				</div>
				{/* <p className='text-2xl mt-4'>Available slots: {parking?.slots_stock}</p> Validar con el back*/}
				<div>
					<button
						type='button'
						className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
						onClick={handleShowSelectSlot}
					>
						Choose your slot
					</button>

					<p>Slot selected: {selectedSlot}</p>
				</div>
				<div className=''>
					<label htmlFor='license_plate'>License plate:</label>
					<input
						id='license_plate'
						name='license_plate'
						value={formData.license_plate}
						className='block w-full p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite focus:ring-blue-500 focus:border-blue-500 text-center'
						onChange={handleInputChange}
						placeholder='AAA-000 '
						required
					></input>
				</div>

				{slotShow && <SlotSelection selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setSlotShow={setSlotShow} />}
				{!user ? (
					<div className='flex flex-col items-center'>
						<p className='text-erieblack text-sm sm:text-lg m-2'>
							You must be <span className='font-semibold'>logged</span> in to book
						</p>
						<LoginButton />
					</div>
				) : (
					<button type='submit' className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none'>
						Reserve
						{/* <Link href='/ourparkings'>Reserve</Link> */}
					</button>
				)}
			</form>
		</div>
	)
}
