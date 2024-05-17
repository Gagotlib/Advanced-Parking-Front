'use client'
import { availableHours, getMaxDate, getTodayDate } from '@/app/utils/dateHelpers'
import { ParkingsMocks } from '@/app/utils/parkingsMock'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ReserveButton } from '../buttons/Buttons'
import Image from 'next/image'

export const ReservationForm = () => {
	const user = { id: 1 } //hardcodeado
	const userId = user.id
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
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
		userId: user.id,
		license_plate: ''
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
		console.log('license plate:', formData.license_plate)

		try {
			//! enviar info al backend
			// await postNewAppointment(formData) // servicio post para mandar la reserva a la BD
			const response = await axios.post(`${rute}/appointments`, formData)
			console.log(response)

			// getAppointmentsByUserId(userId, dispatch) // servicio get para traer las reservas

			// Limpiar el formulario
			setFormData({
				date: getTodayDate(),
				time: '08:00',
				parking: '',
				userId: user.id,
				license_plate: ''
			})
			setShowToast(true)
		} catch (error) {
			console.log(error)
			setErrorToast(true)
		}
	}

	return (
		<div>
			<div>
				<h2 className='text-xl text-gray-900 dark:text-white font-bold mb-2'>Digital Transformation</h2>
				<div className='pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse'>
					<div inline-datepicker datepicker-buttons datepicker-autoselect-today className='mx-auto sm:mx-0'></div>
					<div className='sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0'>
						<h3 className='text-gray-900 dark:text-white text-base font-medium mb-3 text-center'>Wednesday 30 June 2024</h3>

						<div className='flex'>
							<div className='relative max-w-sm'>
								<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
									<svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
										<path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
									</svg>
								</div>
								<input
									datepicker-format='mm/dd/yyyy'
									type='text'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Select date'
								/>
							</div>

							<div>
								<button
									type='button'
									data-collapse-toggle='timetable'
									className='inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
								>
									<svg className='w-4 h-4 text-gray-800 dark:text-white me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
										<path
											fill-rule='evenodd'
											d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
											clip-rule='evenodd'
										/>
									</svg>
									Pick a time
								</button>
								<label className='sr-only'>Pick a time</label>
								<ul id='timetable' className='grid w-full grid-cols-2 gap-2 mt-5'>
									<li>
										<input type='radio' id='10-am' value='' className='hidden peer' name='timetable' />
										<label
											id='10-am'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											10:00 AM
										</label>
									</li>

									<li>
										<input type='radio' id='11-am' value='' className='hidden peer' name='timetable' />
										<label
											id='11-am'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											11:00 AM
										</label>
									</li>

									<li>
										<input type='radio' id='12-am' value='' className='hidden peer' name='timetable' checked />
										<label
											id='12-am'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											12:00 AM
										</label>
									</li>

									<li>
										<input type='radio' id='1-pm' value='' className='hidden peer' name='timetable' />
										<label
											id='1-pm'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											01:00 PM
										</label>
									</li>

									<li>
										<input type='radio' id='2-pm' value='' className='hidden peer' name='timetable' />
										<label
											id='2-pm'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											02:00 PM
										</label>
									</li>

									<li>
										<input type='radio' id='3-pm' value='' className='hidden peer' name='timetable' />
										<label
											id='3-pm'
											className='inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500'
										>
											03:00 PM
										</label>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<ReserveButton />
			</div>
		</div>
	)
}

export default ReservationForm

// < h1 className = 'font-medium text-4xl lg:text-6xl' > Booking</ >
// 	<form className='flex flex-wrap flex-col justify-center lg:justify-start items-center gap-4 m-4 text-center border-2 border-lightgray rounded-xl p-4 w-10/20 text-lg' onSubmit={handleSubmit}>
// 	< div className = '' >
// 					<label htmlFor='date'>Date:</label>
// 					<input
// 						type='date'
// 						name='date'
// 						id='date'
// 						value={formData.date}
// 						min={getTodayDate()}
// 						max={getMaxDate()}
// 						onChange={handleInputChange}
// 						// onInvalid={(e) => e.target.setCustomValidity('Seleccione un día hábil entre hoy y dentro de 2 meses')}
// 						// onInput={(e) => e.target.setCustomValidity('')}
// 						required
// 						pattern='\d{4}-\d{2}-\d{2}'
// 					/>
// {/* {errors.date && <p className='text-red-500'>{errors.date}</p>} */ }
// 				</ >
// 	<div className=''>
// 		<label htmlFor='time'>Time: </label>
// 		<select
// 			id='time'
// 			name='time'
// 			className='z-10'
// 			size={5}
// 			value={formData.time}
// 			onChange={handleInputChange}
// 			required>
// 			{availableHours.map((hour) => (
// 				<option key={hour} value={hour}>
// 					{hour}
// 				</option>
// 			))}
// 		</select>
// 	</div>
// {/* <p className='text-2xl mt-4'>Available slots: {parking?.slots_stock}</p> Validar con el back*/ }
// <div className=''>
// 	<label htmlFor='license_plate'>License plate:</label>
// 	<input
// 		id='license_plate'
// 		name='license_plate'
// 		value={formData.license_plate}
// 		className='block w-full p-4 mt-4 text-lg lg:text-xl font-medium text-erieblack border border-silver rounded-lg bg-ghostwhite focus:ring-blue-500 focus:border-blue-500 text-center'
// 		onChange={handleInputChange}
// 		required
// 	>
// 	</input>
// </div>
