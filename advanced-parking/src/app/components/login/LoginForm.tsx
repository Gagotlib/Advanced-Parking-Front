'use client'

import Toast from '@/app/components/alerts/Toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { GoogleButton } from '../buttons/GoogleButton'
import Spiner from '../spiner/Spiner'

export const LoginForm = () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const router = useRouter()
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const { user, setUser } = useAuth()
	const { token, setToken } = useAuth()
	const [isloging, setIsloging] = useState(false)

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
				const previewUrl = localStorage.getItem('pathname')
				setShowToast(false)
				router.refresh()
				if (previewUrl?.includes('ourparkings')) {
					// console.log('CONTIENEEEEE')

					router.push(previewUrl)
				} else router.push('/home')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setLoginData((user) => ({
			...user,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsloging(true)
		try {
			// console.log(loginData)

			const response = await axios.post(`${rute}/auth/signin`, loginData)
			setUser(response.data.userData)
			setToken(response.data.token)
			localStorage.setItem('authToken', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.userData))
			setIsloging(false)
			setShowToast(true)
			//! throw new Error('Login successful') para forzar error
		} catch (error: Error | any) {
			// console.log(error)
			console.error('Error al iniciar sesión:', error?.response)
			setErrorToast(true)
			setIsloging(false)
		}
	}

	return (
		<div className='h-screen bg-ghostwhite text-erieblack dark:text-ghostwhite dark:bg-gray-500 pt-4  '>
			<div className='w-full h-full flex flex-col items-center pt-20'>
				{showToast && <Toast message='Login successful' type='success' />}
				{errorToast && <Toast message='Username or password are incorrect' type='error' />}
				<h1 className='text-3xl sm:text-6xl uppercase font-extrabold mb-6'>Login</h1>
				<p className='text-erieblack dark:text-ghostwhite mb-6 text-sm sm:text-3xl'>Welcome! So good to have you back!</p>
				<div className='border-silver rounded-lg p-4 m-4 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/40 dark:shadow-ghostwhite'>
					<form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
						<div className='mb-5'>
							<label htmlFor='email' id='email' className='block mb-2 text-sm font-normal text-erieblack dark:text-ghostwhite'>
								Your email
							</label>
							<input
								type='text'
								id='email'
								name='email'
								className='bg-ghostwhite border border-silver text-erieblack text-sm rounded-lg block w-full p-2.5'
								placeholder='name@email.com'
								value={loginData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='mb-5'>
							<label htmlFor='password' id='password' className='block mb-2 text-sm font-medium text-erieblack dark:text-ghostwhite'>
								Your password
							</label>
							<input
								type='password'
								id='password'
								name='password'
								className='bg-ghostwhite border border-silver text-erieblack  text-sm rounded-lg block w-full p-2.5'
								value={loginData.password}
								onChange={handleChange}
								placeholder='******'
								required
							/>
						</div>
						<button
							type='submit'
							className='text-ghostwhite bg-yaleblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-silver font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							{isloging ? <Spiner /> : 'Login'}
						</button>
					</form>
				</div>
				<div className='text-center p-2'>
					<Link className='inline-block text-sm text-erieblack dark:text-ghostwhite align-baseline hover:text-yaleblue/80 pt-4' href='/recoverpassword'>
						Forgot Password?
					</Link>
				</div>
				<div className='flex gap-2 pt-4'>
					<p className='text-sm sm:text-lg'>Don´t have an account?</p>
					<Link className='text-erieblack text-sm font-bold underline hover:text-yaleblue/80 decoration-yaleblue hover:decoration-duck-yellow sm:text-lg' href='/register'>
						Register here
					</Link>
				</div>
				<br />
				<GoogleButton />
			</div>
		</div>
	)
}

export default LoginForm
