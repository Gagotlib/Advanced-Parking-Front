import { useAuth } from '@/app/context/AuthContext'
import { IErrors } from '@/types'
import React, { useEffect, useState } from 'react'
import { validateName, validatePhone, validatePassword, confirmPassword } from '@/app/utils/formsValidation'
import { showSweetAlertChangeInfo } from '../alerts/SweetAlert'
import ProfileChangePhoto from './ProfileChangePhoto'
import axios from 'axios'

function ProfileEdit({ observer, setObserver, showChangeInfo, setShowChangeInfo }: { observer: any; setObserver: any; showChangeInfo: any; setShowChangeInfo: any }) {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const { user, setUser } = useAuth()

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState<IErrors>({
		name: '',
		phone: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		// console.log(name, value);

		if (name === 'name') setName(value)
		if (name === 'phone') setPhone(value)
		if (name === 'password') setPassword(value)
		if (name === 'confirmPassword') setConfirmPassword(value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('enviando')
		const newUserData: any = {}

		if (name.trim() !== '') newUserData.name = name
		if (phone.trim() !== '') newUserData.phone = Number(phone)
		if (password.trim() !== '') newUserData.password = password
		if (confirmPassword.trim() !== '') newUserData.confirmPassword = confirmPassword

		const validationErrors: IErrors = {}
		if (!validateName(newUserData.name)) validationErrors.name = 'Invalid name'
		if (!validatePhone(newUserData.phone)) validationErrors.phone = 'Invalid phone number'
		if (newUserData.password && !validatePassword(newUserData.password)) {
			validationErrors.password = 'Invalid password'
		}
		if (newUserData.password !== newUserData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match'

		setErrors(validationErrors)

		if (Object.keys(validationErrors).length === 0 || Object.keys(newUserData).length === 1) {
			const confirm = await showSweetAlertChangeInfo(() => {
				return handleSubmitConfirmed(newUserData)
			})
		} else {
			console.log('hay errores')
		}
	}

	const handleSubmitConfirmed = async (newUserData: any) => {
		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		if (!logedUser) {
			console.error('No logged user found')
			return
		}
		// console.log('token', token)
		// if (!token) {
		//   console.error('No auth token found')
		//   return
		// }

		try {
			console.log(newUserData)

			const token = localStorage.getItem('authToken')
			const response = await axios.put(`${rute}/user/${logedUser.id}`, newUserData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			// const updatedUser = { ...logedUser, image: response.data.image }
			setUser(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			console.log('data update :', response.data)
			setObserver((observer: any) => observer + 1)
			setName('')
			setPhone('')
			setPassword('')
			setConfirmPassword('')
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	const handleDiscard = () => {
		setName('')
		setPhone('')
		setPassword('')
		setConfirmPassword('')
	}
	const handleCancel = () => {
		setShowChangeInfo(!showChangeInfo)
	}

	return (
		<div className='flex flex-col lg:flex lg:justify-around bg-ghostwhite border border-silver/80 rounded-xl shadow-lg shadow-silver/90 gap-4 text-erieblack lg:w-full lg:h-full p-4'>
			<h3 className='font-bold text-3xl'>Edit Profile</h3>
			<form onSubmit={handleSubmit} className='md:flex md:justify-evenly'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col'>
						<label htmlFor='name' className='text-md font-semibold'>
							Name:
						</label>
						<input type='text' name='name' id='name' className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl' placeholder='Change your Name' value={name} onChange={handleChange} />
						{errors.name && <p className='text-red-500'>{errors.name}</p>}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='phone' className='text-md font-semibold'>
							Phone:
						</label>
						<input type='text' name='phone' id='phone' className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl' placeholder='Change your Phone' value={phone} onChange={handleChange} />
						{errors.phone && <p className='text-red-500'>{errors.phone}</p>}
					</div>
				</div>
				<div className='flex flex-col gap-8 pt-9 sm:pt-0 lg:pl-4'>
					<div className='flex flex-col'>
						<label htmlFor='password' className='text-md font-semibold'>
							Password:
						</label>
						<input id='password' name='password' type='password' className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl' placeholder='Change your password' value={password} onChange={handleChange} />
						{errors.password && <p className='text-red-500'>{errors.password}</p>}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='confirmPassword' className='text-md font-semibold'>
							Confirm Password:
						</label>
						<input
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl'
							placeholder='Confirm your new password'
							value={confirmPassword}
							onChange={handleChange}
						/>
						{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
					</div>
				</div>
				<div className='flex justify-center items-center pt-8'></div>
				<div className='flex  md:flex-col justify-around pt-5 lg:pl-4'>
					<button type='submit' className='bg-blue-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32'>
						Save
					</button>
					<button onClick={handleDiscard} type='button' className='bg-red-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32'>
						Discard
					</button>
					<button onClick={handleCancel} type='button' className='bg-blue-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32'>
						Cancel
					</button>
				</div>
			</form>
			<ProfileChangePhoto />
		</div>
	)
}

export default ProfileEdit
