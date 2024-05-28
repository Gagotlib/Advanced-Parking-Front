'use client'
import React, { useEffect, useState } from 'react'
import Toast from '../components/alerts/Toast'
import Spiner from '../components/spiner/Spiner'
import axios from 'axios'

const Recoverpassword = () => {
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [isloading, setIsloading] = useState(false)

	useEffect(() => {
		if (showToast || errorToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
				setErrorToast(false)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, errorToast])

	const [loginData, setLoginData] = useState({
		email: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setLoginData((user) => ({
			...user,
			[name]: value
		}))
	}

	const handleSubmit = async () => {
		const rute = process.env.NEXT_PUBLIC_BACK_API_URL
		setIsloading(true)
		//* funcion que mande al back el email del usuario
		axios
			.post(`${rute}/user/request-password-reset`, {
				email: loginData.email
			})
			.then(() => {
				setShowToast(true)
				setIsloading(false)
			})
	}

	return (
		<div className='h-screen text-erieblack dark:text-ghostwhite pt-4'>
			<div className='w-full h-full flex flex-col items-center pt-20'>
				{showToast && <Toast message='A new password has been send to your email' type='success' />}
				{errorToast && <Toast message='email not registered' type='error' />}
				<h1 className='text-3xl sm:text-6xl uppercase font-extrabold mb-6'>Recover your password</h1>
				<p className='text-erieblack dark:text-ghostwhite mb-6 text-sm sm:text-3xl'>Tell us your email and we will send you a link to reset your password</p>
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
						<button
							type='submit'
							className='text-ghostwhite bg-yaleblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-silver font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							{isloading ? <Spiner /> : 'Submit'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Recoverpassword
