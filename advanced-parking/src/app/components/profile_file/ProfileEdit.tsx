import axios from 'axios'
import { IErrors } from '@/types'
import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import ProfileChangePhoto from './ProfileChangePhoto'
import { showSweetAlertChangeInfo } from '../alerts/SweetAlert'
import { validateName, validatePhone, validateChangeInfo } from '@/app/utils/formsValidation'

function ProfileEdit({ observer, setObserver, showChangeInfo, setShowChangeInfo }: { observer: any; setObserver: any; showChangeInfo: any; setShowChangeInfo: any }) {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const { user, setUser } = useAuth()

	const [changeInfo, setChangeInfo] = useState({
		name: '',
		phone: '',
	})

	const [errors, setErrors] = useState<IErrors>({
		name: '',
		phone: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setChangeInfo((prevInfo) => ({
			...prevInfo,
			[name]: value
		}))

		const fieldErrors = validateChangeInfo({ ...changeInfo, name: value, })
		setErrors((prevErrors: any) => ({
			...prevErrors,
			[name]: fieldErrors[name]
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.log('Enviado al backend')

		const newUserData: any = {}

		if (changeInfo.name.trim() !== '') newUserData.name = changeInfo.name
		if (changeInfo.phone.trim() !== '') newUserData.phone = Number(changeInfo.phone)

		const validationErrors: IErrors = {}
		if (!validateName(newUserData.name)) validationErrors.name = errors.name
		if (!validatePhone(newUserData.phone)) validationErrors.phone = errors.phone

		setErrors(validationErrors)

		if (Object.keys(validationErrors).every(key => validationErrors[key] === '')) {
			const confirm = await showSweetAlertChangeInfo(() => {
				return handleSubmitConfirmed(newUserData);
			});
		} else {
			console.error('There are errors or all fields are empty.')
		}
	}

	const handleSubmitConfirmed = async (newUserData: any) => {
		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		if (!logedUser) {
			console.error('No logged user found')
			return
		}
		try {
			// console.log(newUserData)
			const token = localStorage.getItem('authToken')
			const response = await axios.put(`${rute}/user/${logedUser.id}`, newUserData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setUser(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			// console.log('data update :', response.data)
			setObserver((observer: any) => observer + 1)
			setChangeInfo({
				name: '',
				phone: '',
			})
			setShowChangeInfo(!showChangeInfo)
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	const handleDiscard = () => {
		setChangeInfo({ name: '', phone: '' })
		setErrors({ name: '', phone: '' });

	}
	const handleCancel = () => {
		setShowChangeInfo(!showChangeInfo)
	}

	return (
		<div className='flex flex-col lg:flex lg:justify-around bg-ghostwhite border border-silver/80 rounded-xl shadow-lg shadow-silver/90 gap-4 text-erieblack lg:w-full lg:h-full p-4'>
			<h3 className='font-bold text-3xl'>Edit Profile</h3>
			<form onSubmit={handleSubmit} className='md:flex md:justify-evenly lg:max-w-[400px]'>
				<div className='flex flex-col gap-8 w-full pr-10'>
					<div className='flex flex-col w-full'>
						<label htmlFor='name' className='text-md font-semibold'>
							Name:
						</label>
						<input type='text' name='name' id='name' className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl w-full' placeholder='Change your Name' value={changeInfo.name} onChange={handleChange} />
						{errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='phone' className='text-md font-semibold'>
							Phone:
						</label>
						<input type='text' name='phone' id='phone' className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl' placeholder='Change your Phone' value={changeInfo.phone} onChange={handleChange} />
						{errors.phone && <p className='text-red-500 text-xs'>{errors.phone}</p>}
					</div>
				</div>

				<div className='flex justify-center items-center pt-8'></div>
				<div className='flex  md:flex-col justify-around pt-5 lg:pl-4'>
					<button type='submit' className='bg-blue-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32 hover:bg-yaleblue'>
						Save
					</button>
					<button onClick={handleDiscard} type='button' className='bg-red-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32 hover:bg-red-700'>
						Discard
					</button>
					<button onClick={handleCancel} type='button' className='bg-blue-500 text-ghostwhite py-2 px-4 rounded-xl w-1/4 md:w-32 hover:bg-yaleblue'>
						Cancel
					</button>
				</div>
			</form>
			<ProfileChangePhoto />
		</div>
	)
}

export default ProfileEdit
