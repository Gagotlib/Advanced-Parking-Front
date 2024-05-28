'use client'
import Toast from '@/app/components/alerts/Toast'
import Spiner from '@/app/components/spiner/Spiner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Newpassword = ({ params }: { params: { id: string } }) => {
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [isloading, setIsloading] = useState(false)
	const router = useRouter()

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
				router.push('/login')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [loginData, setLoginData] = useState({
		password: '',
		confirmPassword: ''
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
		// console.log('enviando form')
		// console.log(loginData)

		const rute = process.env.NEXT_PUBLIC_BACK_API_URL
		setIsloading(true)
		//* funcion que mande al back el email del usuario
		axios
			.post(`${rute}/user/reset-password`, {
				token: params.id,
				newPassword: loginData.password
			})
			.then((response) => {
				console.log(response)
				setShowToast(true)
			})
			.catch((error) => {
				console.log(error)
			})

		setIsloading(false)
	}

	return (
		<div className='h-screen bg-ghostwhite text-erieblack dark:text-ghostwhite dark:bg-gray-500 pt-4  '>
			<div className='w-full h-full flex flex-col items-center pt-20'>
				{showToast && <Toast message='New password created' type='success' />}
				{errorToast && <Toast message='Something went wrong' type='error' />}
				<h1 className='text-3xl sm:text-6xl uppercase font-extrabold mb-6'>Set a new password</h1>
				<p className='text-erieblack dark:text-ghostwhite mb-6 text-sm sm:text-3xl'>Choose a new password for your account </p>
				<div className='border-silver rounded-lg p-4 m-4 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/40 dark:shadow-ghostwhite'>
					<form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
						<div className='mb-5'>
							<label htmlFor='password' id='password' className='block mb-2 text-sm font-medium text-erieblack dark:text-ghostwhite'>
								New password
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
						<div className='mb-5'>
							<label htmlFor='password' id='password' className='block mb-2 text-sm font-medium text-erieblack dark:text-ghostwhite'>
								Confirm your password
							</label>
							<input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								className='bg-ghostwhite border border-silver text-erieblack  text-sm rounded-lg block w-full p-2.5'
								value={loginData.confirmPassword}
								onChange={handleChange}
								placeholder='******'
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

export default Newpassword
