'use client'
import React, { useEffect, useState } from 'react'
import { BackToHomeButton, BackToOurParkingsButton, BackToSubscriptionsButton } from '../components/buttons/Buttons'
import { availableHours, getMaxDate, getTodayDate } from '../utils/dateHelpers'
import { ParkingsMocks } from '../utils/parkingsMock'
import { useRouter } from 'next/navigation'
import Toast from '../components/alerts/Toast'

interface IFormData {
	userId: string
	date: string
	time: string
	parking: string
}

export const Reservations = () => {
	const user = { id: 1 } //hardcodeado
	const userId = user.id

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
				router.push('/')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [formData, setFormData] = useState({
		date: getTodayDate(),
		time: '08:00',
		parking: '',
		userId: user.id
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

		//! control
		console.log('Fecha seleccionada:', formData.date)
		console.log('Hora seleccionada:', formData.time)
		console.log('Parking:', formData.parking)

		try {
			//! enviar info al backend
			// await postNewAppointment(formData) // servicio post para mandar la reserva a la BD

			// getAppointmentsByUserId(userId, dispatch) // servicio get para traer las reservas

			// Limpiar el formulario
			setFormData({
				date: getTodayDate(),
				time: '08:00',
				parking: '',
				userId: user.id
			})
			setShowToast(true)
		} catch (error) {
			console.log(error)
			setErrorToast(true)
		}
	}

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			{showToast && <Toast message='Login successful' type='success' />}
			{errorToast && <Toast message='Username or password are incorrect' type='error' />}
			<div className=' flex flex-col min-h-screen py-4 m-0 gap-4 items-center justify-start'>
				<div>
					<h1>Solicitar una nueva Reserva</h1>
					<form className='flex flex-wrap flex-col justify-center items-center gap-4 m-4 text-center border-2 border-lightgray rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
						<div className=''>
							<label htmlFor='date'>Seleccione una fecha: </label>
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
							<label htmlFor='time'>Hora: </label>
							<select id='time' name='time' value={formData.time} onChange={handleInputChange} required>
								{availableHours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</select>
						</div>
						<div className=''>
							<label htmlFor='parking'>Seleccione un parking: </label>
							<select id='parking' name='parking' value={formData.parking} onChange={handleInputChange} required>
								{ParkingsMocks.map((parking) => (
									<option key={parking.name} value={parking.name}>
										{' '}
										{parking.name}{' '}
									</option>
								))}
							</select>
						</div>

						<button
							className='py-2.5 px-5 my-8 me-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-duck-yellow rounded-lg border border-gray-200 hover:bg-yellow-300  focus:z-10 focus:ring-4 focus:ring-gray-100 shadow-xl'
							type='submit'
						>
							Solicitar
						</button>
					</form>
				</div>
				{/* ver si estastos links son necesarios o los sacamos porque estan en el navbar */}
				<div className='flex flex-col gap sm:flex-row'>
					<BackToOurParkingsButton />
					<BackToSubscriptionsButton />
					<BackToHomeButton />
				</div>
			</div>
		</div>
	)
}

export default Reservations
