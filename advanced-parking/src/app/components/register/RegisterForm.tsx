'use client'

import Toast from '@/app/components/alerts/Toast'
import { IErrors, IUser } from '@/types'
import { validateRegister } from '@/app/utils/formsValidation'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const RegisterForm = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

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
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [errors, setErrors] = useState<IErrors>({
		name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const { name, value } = e.target;
		setRegisterData((user) => ({
			...user,
			[name]: value,
		}));

		const fieldErrors = validateRegister({ ...registerData, [name]: value });
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: fieldErrors[name]
		}));
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		console.log('mandado')
		console.log(registerData)

		const validationErrors = validateRegister(registerData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			try {

				const registerPayload = {
					...registerData,
					phone: parseInt(registerData.phone, 10),
				};

				const response = await axios.post(`${rute}/auth/signup`, registerPayload) //!deberia funcionar
				console.log(response.data)

				setShowToast(true)
				
				const bodyemail = {
					name: registerData.name,
					email: registerData.email,
				};
				axios.post(`${rute}/email-sender/registered`, bodyemail)

				// throw Error('error forzado')

			} catch (error: Error | any) {
				console.error('Error al Registrarse:', error.response?.data?.message)

				setErrorToast(true)
				setErrorMessage(error.response?.data?.message || 'An unexpected error occurred')
				// alert(error?.response?.data.message)
			}
		}
	}

	return (
		<div className='h-screen bg-ghostwhite'>
			<div className='w-full h-full flex flex-col items-center pt-24'>
				{showToast && <Toast message='Registered correctly' type='success' />}
				{errorToast && <Toast message={errorMessage} type='error' />}
				<div className='w-full lg:w-7/12 p-5 rounded-lg lg:rounded-l-none'>
					<h3 className='py-2 text-2xl text-center font-extrabold text-erieblack sm:text-5xl'>Create an Account!</h3>
					<div className='border-silver rounded-lg p-4 m-2 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/40'>
						<form className='px-8 pb-8 mb-4 rounded sm:pt-6' onSubmit={handleSubmit}>
							<div className='mb-4 sm:flex sm:justify-between'>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label className='block mb-1 text-sm font-bold text-erieblack sm:text-lg'>Full Name</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow shadow-erieblack appearance-none focus:outline-yaleblue/80 focus:shadow-yaleblue'
										id='name'
										name='name'
										type='text'
										placeholder='Full Name'
										required
										value={registerData.name}
										onChange={handleChange}
									/>
									{errors.name && <p className='text-red-500 sm:absolute my-1 text-xs font-light'>{errors.name}</p>}
								</div>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label className='block mb-1 text-sm font-bold text-erieblack sm:text-lg'>Phone Number</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow shadow-erieblack appearance-none focus:outline-yaleblue/80 focus:shadow-yaleblue'
										id='phone'
										name='phone'
										type='text'
										placeholder='Phone number'
										required
										value={registerData.phone}
										onChange={handleChange}
									/>
									{errors.phone && <p className='text-red-500 sm:absolute my-1 text-xs font-light'>{errors.phone}</p>}
								</div>
							</div>
							<div className='mb-4 sm:mr-2 sm:mb-5'>
								<label className='block mb-1 text-sm font-bold text-erieblack sm:text-lg'>Email</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow shadow-erieblack appearance-none focus:outline-yaleblue/80 focus:shadow-yaleblue'
									id='email'
									name='email'
									type='mail'
									placeholder='Email'
									required
									value={registerData.email}
									onChange={handleChange}
								/>
								{errors.email && <p className='text-red-500 sm:absolute my-1 text-xs font-light'>{errors.email}</p>}
							</div>
							<div className='mb-4 sm:flex sm:justify-between'>
								<div className='mb-4 sm:mr-2 sm:mb-5'>
									<label className='block mb-1 text-sm font-bold text-erieblack sm:text-lg'>Password</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow shadow-erieblack appearance-none focus:outline-yaleblue/80 focus:shadow-yaleblue'
										id='password'
										name='password'
										type='password'
										placeholder='*********'
										required
										value={registerData.password}
										onChange={handleChange}
									/>
									{errors.password && <p className='text-red-500 sm:absolute my-1 text-xs font-light'>{errors.password}</p>}
								</div>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label className='block mb-2 text-sm font-bold text-erieblack sm:text-lg'>Confirm Password</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-erieblack rounded shadow shadow-erieblack appearance-none focus:outline-yaleblue/80 focus:shadow-yaleblue'
										id='c_password'
										name='confirmPassword'
										type='password'
										placeholder='*********'
										value={registerData.confirmPassword}
										onChange={handleChange}
									/>
									{errors.confirmPassword && <p className='text-red-500 sm:absolute my-1 text-xs font-light'>{errors.confirmPassword}</p>}
								</div>
							</div>
							<div className='mb-6 text-center'>
								{Object.values(errors).some((error) => error) ? (
									<button className='w-full px-4 py-2 font-bold text-ghostwhite bg-yaleblue rounded-full hover:bg-yaleblue/80 focus:outline-none focus:shadow-outline' type='submit' disabled>
										Register Account
									</button>
								) : (
									<button className='w-full px-4 py-2 font-bold text-ghostwhite bg-yaleblue rounded-full hover:bg-yaleblue/80 focus:outline-none focus:shadow-outline' type='submit'>
										Register Account
									</button>
								)}
							</div>
							<hr className='border-t' />
							<div className='text-center'>
								<p className='text-erieblack text-sm '>
									Already have an account?
									<Link href='/login' className='inline-block text-sm text-erieblack align-baseline hover:text-yaleblue/80 underline'>
										Login!
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
