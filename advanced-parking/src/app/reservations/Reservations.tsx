'use client'
import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import { BackToHomeButton, HireButton } from '../components/buttons/Buttons'
import { getMaxDate, getTodayDate } from '../utils/dateHelpers'
import { validateNewAppointment } from '../utils/formsValidation'
import { ParkingsMocks } from '../utils/parkingsMock'

interface IFormData {
	userId: string
	date: string
	time: string
	parking: string
}

export const Reservations = () => {
	const user = { id: 1 } //hardcodeado
	const userId = user.id

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

		// Si hay errores, mostrar alerta y salir de la función
		// const hasErrors = Object.keys(errors).some((key) => errors[key] !== '')
		// if (hasErrors) {
		// 	alert(errors.date)
		// 	return
		// }
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

			// alert('reserva agendada')
		} catch (error) {
			console.log(error)
		}
	}

	const availableHours = [
		'00:00',
		'01:00',
		'02:00',
		'03:00',
		'04:00',
		'05:00',
		'06:00',
		'07:00',
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00',
		'20:00',
		'21:00',
		'22:00',
		'23:00'
	]

	return (
		<div className='flex flex-col min-h-screen '>
			<Navbar />
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
				<BackToHomeButton />
			</div>
		</div>
	)
}

export default Reservations
