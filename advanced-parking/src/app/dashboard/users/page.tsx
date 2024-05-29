'use client'
import { showSweetAlertCreatedUser } from '@/app/components/alerts/SweetAlert'
import Toast from '@/app/components/alerts/Toast'
import { validateRegister } from '@/app/utils/formsValidation'
import { IErrors, IUser } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

const Page = () => {
	const [observer, setObserver] = useState(0)
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allUsers, setAllsers] = useState<IUser[] | null>(null)
	const [errorToast, setErrorToast] = useState(false)
	const [showToast, setShowToast] = useState(false)
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
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				const activeUsers = data.filter((user: IUser) => user.status === 'active')
				const deletedUsers = data.filter((user: IUser) => user.status === 'deleted')
				const sortedUsers = activeUsers.concat(deletedUsers)
				setAllsers(sortedUsers)
			})
	}, [observer])

	const [isForm, setIsForm] = useState(false)
	const [formData, setFormData] = useState<IUser>({
		name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [errors, setErrors] = useState<IErrors>({
		name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleAddNewUser = () => {
		setIsForm(!isForm)
	}
	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
		const fieldErrors = validateRegister({ ...formData, [name]: value })
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: fieldErrors[name]
		}))
	}
	const handleSendChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.log('adding new User')
		// console.log(formData)
		showSweetAlertCreatedUser(() => {
			const validationErrors = validateRegister(formData)
			setErrors(validationErrors)
			if (Object.keys(validationErrors).length === 0) {
				const registerPayload = {
					...formData,
					phone: parseInt(formData.phone, 10)
				}
				const token = localStorage.getItem('authToken')
				axios
					.post(`${rute}/auth/signup`, registerPayload)
					.then(({ data }) => {
						setShowToast(true)
						// console.log(data)
						setObserver((observer) => observer + 1)
						setFormData({
							name: '',
							phone: '',
							email: '',
							password: '',
							confirmPassword: ''
						})
						setIsForm(!isForm)
						const bodyemail = {
							name: formData.name,
							email: formData.email
						}
						axios.post(`${rute}/email-sender/registered`, bodyemail)
					})
					.catch((error) => {
						setErrorToast(true)
						setErrorMessage(error.response?.data?.message || 'An unexpected error occurred')
					})
			}
		})
	}

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			{showToast && <Toast message='Registered correctly' type='success' />}
			{errorToast && <Toast message={errorMessage} type='error' />}
			<h1 className='text-2xl sm:text-5xl font-bold'>Users Info</h1>
			<div className='flex flex-row justify-between items-center'>
				<h3 className='flex justify-start text-md sm:text-xl font-base'>
					Total Users: <span className='font-bold'> {allUsers?.length}</span>
				</h3>
				<button
					type='button'
					className='mb-4 py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
					onClick={handleAddNewUser}
				>
					Add new User
				</button>
			</div>
			{isForm && (
				<form onSubmit={handleSendChanges}>
					<div className='flex flex-col w-auto gap-3'>
						<div>
							<label htmlFor='name'>Name</label>
							<input type='text' placeholder=' User name ' name='name' id='name' className='border rounded-md text-md h-7 ml-4' value={formData.name} onChange={handleChangeValue} />
							{errors.name && <p className='text-red-500  my-1 text-xs font-light'>{errors.name}</p>}
						</div>
						<div>
							<label htmlFor='Email'>Email</label>
							<input type='email' placeholder='User email' name='email' id='email' className='border rounded-md h-7 ml-4' onChange={handleChangeValue} value={formData.email} />
							{errors.email && <p className='text-red-500 my-1 text-xs font-light'>{errors.email}</p>}
						</div>
						<div>
							<label htmlFor='phone'>Phone</label>
							<input type='text' placeholder='Phone number' name='phone' id='phone' className='border rounded-md h-7 ml-4' onChange={handleChangeValue} value={formData.phone} />
							{errors.phone && <p className='text-red-500 my-1 text-xs font-light'>{errors.phone}</p>}
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input type='password' placeholder='*******' name='password' id='password' className='border rounded-md h-7 ml-4' onChange={handleChangeValue} value={formData.password} />
							{errors.password && <p className='text-red-500 my-1 text-xs font-light'>{errors.password}</p>}
						</div>
						<div>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
								type='password'
								placeholder='******'
								name='confirmPassword'
								id='confirmPassword'
								className='border rounded-md h-7 ml-4'
								onChange={handleChangeValue}
								value={formData.confirmPassword}
							/>
							{errors.confirmPassword && <p className='text-red-500  my-1 text-xs font-light'>{errors.confirmPassword}</p>}
						</div>
						<div className='flex gap-4 mb-8'>
							<button
								type='button'
								className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-silver hover:bg-red-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
								onClick={() => {
									// console.log('reset')

									setFormData({
										name: '',
										email: '',
										phone: '',
										password: '',
										confirmPassword: ''
									})
									setErrors({
										name: '',
										phone: '',
										email: '',
										password: '',
										confirmPassword: ''
									})
								}}
							>
								Discard
							</button>
							<button
								type='submit'
								className='py-2 px-2 w-40 text-base font-medium text-white focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-green-600 hover:text-ghostwhite focus:z-10 focus:ring-2'
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			)}
			<div className='relative flex flex-col'>
				<Suspense fallback={<p>Loading...</p>}>
					<table className='sm:max-w-full min-w-full table-auto w-full h-full border-collapse'>
						<thead>
							<tr>
								<th className='border p-2 text-left'>Role</th>
								<th className='border p-2 text-left'>Name </th>
								<th className='border p-2 text-left'>Email </th>
								<th className='border p-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{allUsers ? (
								allUsers.map((user) => (
									<tr key={user.id} className='hover:bg-silver/20'>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>{user.role}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>{user.name}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>{user.email}</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>{user.status}</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} className='border p-2 text-center'>
										Loading...
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	)
}

export default Page
