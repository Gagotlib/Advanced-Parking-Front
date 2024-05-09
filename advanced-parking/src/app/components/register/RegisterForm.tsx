'use client'
import Toast from '@/app/components/alerts/Toast'
import { IErrors, IUser } from '@/types'
import { validateRegister } from '@/app/utils/formsValidation'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const RegisterForm = () => {
	const router = useRouter()
	const [showToast, setShowToast] = useState(false)
	const [errorToast, setErrorToast] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		if (showToast || errorToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
				setErrorToast(false)
				setErrorMessage('')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, errorToast])
	useEffect(() => {
		if (showToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push('/login')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [registerData, setRegisterData] = useState<IUser>({
		name: '',
		email: '',
		password: '',
		address: '',
		phone: ''
	})
	const [errors, setErrors] = useState<IErrors>({
		name: '',
		email: '',
		password: '',
		address: '',
		phone: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setRegisterData((user) => ({
			...user,
			[name]: value
		}))
		const fieldErrors = validateRegister({ ...registerData, [name]: value })
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: fieldErrors[name]
		}))
	}

	// const ruta = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			console.log(registerData)
			// await axios.post(`${ruta}/users/register`, registerData)
			const response = await axios.post('/ http://localhost:3001/auth/signup', registerData) //!deberia funcionar
			console.log(response)

			setShowToast(true)
		} catch (error: Error | any) {
			console.error('Error al Registrarse:', error?.response?.data.message)
			setErrorToast(true)
			setErrorMessage(error?.response?.data.message || 'An unexpected error occurred')
		}
	}
	return (
		<div className='h-screen bg-erieblack'>
			<div className=' w-full h-full flex flex-col items-center pt-24'>
				{showToast && <Toast message='Registered correctly' type='success' />}
				{errorToast && <Toast message={errorMessage} type='error' />}
				<div className='w-full lg:w-7/12 p-5 rounded-lg lg:rounded-l-none'>
					<h3 className='py-4 text-2xl text-center text-ghostwhite'>Create an Account!</h3>
					<form className='px-8 pt-6 pb-8 mb-4rounded' onSubmit={handleSubmit}>
						<div className='mb-4 md:flex md:justify-between'>
							<div className='mb-4 md:mr-2 md:mb-0'>
								<label className='block mb-2 text-sm font-bold text-ghostwhite' id='name'>
									First Name
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='name'
									name='name'
									type='text'
									placeholder='First Name'
									required
									value={registerData.name}
									onChange={handleChange}
								/>
								{errors.name && <p className='text-red-500'>{errors.name}</p>}
							</div>
							<div className='md:ml-2'>
								<label className='block mb-2 text-sm font-bold text-ghostwhite' id='phone'>
									Phone Number
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-erieblack border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='phone'
									name='phone'
									type='text'
									placeholder='Phone number'
									required
									value={registerData.phone}
									onChange={handleChange}
								/>
								{errors.phone && <p className='text-red-500'>{errors.phone}</p>}
							</div>
						</div>
						<div className='mb-4'>
							<label className='block mb-2 text-sm font-bold text-ghostwhite' id='email'>
								Email
							</label>
							<input
								className='w-full px-3 py-2 mb-3 text-sm leading-tight text-erieblack border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
								id='email'
								name='email'
								type='mail'
								placeholder='Email'
								required
								value={registerData.email}
								onChange={handleChange}
							/>
							{errors.email && <p className='text-red-500'>{errors.email}</p>}
						</div>
						<div className='mb-4 md:flex md:justify-between'>
							<div className='mb-4 md:mr-2 md:mb-0'>
								<label className='block mb-2 text-sm font-bold text-ghostwhite' id='password'>
									Password
								</label>
								<input
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-erieblack border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='password'
									name='password'
									type='password'
									placeholder='*********'
									required
									value={registerData.password}
									onChange={handleChange}
								/>
								{errors.password && <p className='text-red-500'>{errors.password}</p>}
							</div>
							<div className='md:ml-2'>
								<label className='block mb-2 text-sm font-bold text-ghostwhite' id='c_password'>
									Confirm Password
								</label>
								<input
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-erieblack border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='c_password'
									type='password'
									placeholder='*********'
								/>
							</div>
						</div>
						<div className='mb-6 text-center'>
							{Object.values(errors).some((error) => error) ? (
								<button className='w-full px-4 py-2 font-bold text-ghostwhite bg-yaleblue rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='button' disabled>
									Register Account
								</button>
							) : (
								<button className='w-full px-4 py-2 font-bold text-ghostwhite bg-yaleblue rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='button'>
									Register Account
								</button>
							)}
						</div>
						<hr className='mb-6 border-t' />
						<div className='text-center'>
							<p className='text-ghostwhite text-sm '>
								Already have an account?
								<Link className='inline-block text-sm text-ghostwhite align-baseline hover:text-blue-800 underline' href='/login'>
									Login!
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
