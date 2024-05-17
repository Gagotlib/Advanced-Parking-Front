'use client'
import Toast from '@/app/components/alerts/Toast'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { useLocation } from 'react-router-dom'
import { GoogleButton } from '../buttons/GoogleButton'

export const LoginForm = () => {
	const pathname = usePathname()
	const rute = process.env.BACK_API_URL
	const router = useRouter()
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const { user, setUser } = useAuth()
	const { token, setToken } = useAuth()

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
				router.refresh()
				router.push('/home')
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
		try {
			console.log(loginData)

			const response = await axios.post(`${rute}/auth/signin`, loginData) //deberia funcionar
			// console.log(response.data)
			setUser(response.data.userData)
			setToken(response.data.token)
			localStorage.setItem('authToken', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.userData))
			setShowToast(true)
			//! throw new Error('Login successful') para forzar error
		} catch (error: Error | any) {
			console.log(error)
			console.error('Error al iniciar sesión:', error?.response)
			setErrorToast(true)
		}
	}

	return (
		<div className='h-screen bg-ghostwhite text-erieblack pt-4'>
			<div className='w-full h-full flex flex-col items-center pt-20'>
				{showToast && <Toast message='Login successful' type='success' />}
				{errorToast && <Toast message='Username or password are incorrect' type='error' />}
				<h1 className='text-3xl sm:text-6xl uppercase font-extrabold mb-6'>Login</h1>
				<p className='text-erieblack mb-6 text-sm sm:text-3xl'>Welcome! So good to have you back!</p>
				<div className='border-silver rounded-lg p-4 m-4 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/40'>
					<form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
						<div className='mb-5'>
							<label htmlFor='email' id='email' className='block mb-2 text-sm font-normal text-erieblack'>
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
							<label htmlFor='password' id='password' className='block mb-2 text-sm font-medium text-erieblack'>
								Your password
							</label>
							<input
								type='password'
								id='password'
								name='password'
								className='bg-ghostwhite border border-silver text-erieblack text-sm rounded-lg block w-full p-2.5'
								value={loginData.password}
								onChange={handleChange}
								placeholder='******'
								required
							/>
						</div>
						{/* <div className='flex items-start mb-5'>
						<div className='flex items-center h-5'>
							<label htmlFor='remember'></label>
							<input id='remember' type='checkbox' value='' className='w-4 h-4 border border-silver rounded bg-silver focus:ring-3 focus:ring-yaleblue' required />
						</div>
						<label id='remember' className='ms-2 text-sm font-normal text-ghostwhite'>
							Remember me
						</label>
					</div> */}
						<button
							type='submit'
							className='text-ghostwhite bg-yaleblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-silver font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							Log In
						</button>
					</form>
				</div>
				<div className='text-center p-2'>
					<Link className='inline-block text-sm text-erieblack align-baseline hover:text-yaleblue/80 pt-4' href='#'>
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
