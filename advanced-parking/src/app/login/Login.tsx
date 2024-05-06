'use client'
import Toast from '@/app/components/alerts/Toast'
// import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const Login = () => {
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
	const ruta = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			console.log(loginData)

			// const session = await axios.post(`${ruta}/users/login`, loginData)
			// localStorage.setItem('authToken', session.data.token)
			// localStorage.setItem('user', JSON.stringify(session.data.user))
			// setShowToast(true)
			// throw new Error('Login successful')
		} catch (error: Error | any) {
			console.log(error)
			console.error('Error al iniciar sesión:', error?.response?.data.message)
			setErrorToast(true)
		}
	}

	return (
		<div className='h-screen '>
			<div className=' w-full h-full flex flex-col items-center pt-24'>
				{showToast && <Toast message='Login successful' type='success' />}
				{errorToast && <Toast message='Username or password are incorrect' type='error' />}
				<h1 className='title'>Login</h1>
				<form className='flex flex-wrap flex-col justify-center items-center gap-4 m-4 text-center border-2 border-lightgray rounded-xl p-4 w-3/5 text-lg' onSubmit={handleSubmit}>
					<div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
						<label className='mr-4' htmlFor='email'>
							Email:
						</label>
						<input className='border border-gray-300 rounded-lg px-2 py-1 text-lg w-4/5' type='text' id='email' name='email' onChange={handleChange} value={loginData.email} required />
					</div>
					<div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
						<label className='mr-4' htmlFor='password'>
							Password:
						</label>
						<input className='border border-gray-300 rounded-lg px-2 py-1 text-lg  w-4/5' type='password' id='password' name='password' onChange={handleChange} value={loginData.password} required />
					</div>
					<button className='border-3 border-solid border-green-500 rounded-lg text-lg py-2 px-4 text-white bg-green-500 hover:bg-green-600' type='submit'>
						Login
					</button>
				</form>
				<div className='flex flex-col items-center'>
					<p>If you do not have an account yet: </p>
					<Link className='text-orange-500 text-lg px-4 py-2 rounded-lg bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500' href='/register'>
						Register here
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
