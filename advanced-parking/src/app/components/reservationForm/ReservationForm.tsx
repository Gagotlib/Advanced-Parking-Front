'use client'
import { availableHours, getMaxDate, getTodayDate } from '@/app/utils/dateHelpers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ReserveButton } from '../buttons/Buttons'
import { useAuth } from '@/app/context/AuthContext'
import { IParking } from '@/types'
import Toast from '../alerts/Toast'

export const ReservationForm = ({ parking }: { parking: IParking | undefined }) => {
	const { user } = useAuth()
	console.log('usuario', user)
	console.log('el parking', parking)

	const router = useRouter()
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)

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

	const [formData, setFormData] = useState({
		date: getTodayDate(),
		time: '08:00',
		parkingLotId: parking?.id,
		userId: user?.id,
		license_plate: '',
		duration: '1',
		is_parked: false
	})
	const [errors, setErrors] = useState({
		date: '',
		time: '',
		parking: ''
	})

	function handleInputChange(event: any) {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))

		// setErrors(validateNewAppointment(formData))
	}

	async function handleSubmit(event: any) {
		event.preventDefault()

		// Si hay errores, mostrar alerta y salir de la función
		// const hasErrors = Object.keys(errors).some((key) => errors[key] !== '')
		// if (hasErrors) {
		// 	alert(errors.date)
		// 	return
		// }
		//! control
		console.log('Fecha seleccionada:', formData.date)
		console.log('Hora seleccionada:', formData.time)
		console.log('Parking:', formData.parkingLotId)
		console.log('license plate:', formData.license_plate)
		console.log('El userid:', formData.userId)

		try {
			//! enviar info al backend
			// await postNewAppointment(formData) // servicio post para mandar la reserva a la BD
			const response = await axios.post('http://localhost:3001/appointments', formData)
			console.log(response)

			//! enviar la response a algun lado para mostrarla

			// Limpiar el formulario
			setFormData({
				date: getTodayDate(),
				time: '08:00',
				parkingLotId: parking?.id,
				userId: user?.id,
				license_plate: '',
				duration: '1',
				is_parked: false
			})
			setShowToast(true)
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push(`/myappointments/${response.data.id}`)
			}, 3000)
		} catch (error) {
			console.log(error)
			setErrorToast(true)
		}
	}

	return (
		<div className='w-10/12 flex flex-col items-center'>
			{showToast && <Toast message='Reservation Successfull' type='success' />}
			{errorToast && <Toast message='Reservation Error' type='error' />}
			<h1 className='font-medium text-4xl lg:text-6xl'> Booking</h1>
			<form className='flex flex-wrap flex-col justify-center lg:justify-start items-center gap-4 text-center border-2 border-silver/80 rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
				<div className=''>
					<label htmlFor='date'>Date:</label>
					<input
						type='date'
						name='date'
						id='date'
						value={formData.date}
						min={getTodayDate()}
						max={getMaxDate()}
						onChange={handleInputChange}
						// onInvalid={(e) => e.target.setCustomValidity('Seleccione un día hábil entre hoy y dentro de 2 meses')}
						// onInput={(e) => e.target.setCustomValidity('')}
						required
						pattern='\d{4}-\d{2}-\d{2}'
					/>
					{/* {errors.date && <p className='text-red-500'>{errors.date}</p>} */}
				</div>
				<div className=''>
					<label htmlFor='time'>Time: </label>
					<input type='time' name='time' id='time' step={'1800'} value={formData.time} onChange={handleInputChange} required />
					{/* <select id='time' name='time' className='' value={formData.time} onChange={handleInputChange} required>
						{availableHours.map((hour) => (
							<option key={hour} value={hour}>
								{hour}
							</option>
						))}
					</select> */}
				</div>
				{/* <p className='text-2xl mt-4'>Available slots: {parking?.slots_stock}</p> Validar con el back*/}
				<div className=''>
					<label htmlFor='license_plate'>License plate:</label>
					<input
						id='license_plate'
						name='license_plate'
						value={formData.license_plate}
						className='block w-full p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite focus:ring-blue-500 focus:border-blue-500 text-center'
						onChange={handleInputChange}
						required
					></input>
				</div>
				{!user ? <p> You must be logged in to book</p> : <ReserveButton />}
			</form>
		</div>
	)
}

export default ReservationForm
