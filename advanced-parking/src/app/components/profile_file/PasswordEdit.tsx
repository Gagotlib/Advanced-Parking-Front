import { useAuth } from '@/app/context/AuthContext'
import { IErrors } from '@/types'
import axios from 'axios'
import React, { useState } from 'react'
import { showSweetAlertChangePassword } from '../alerts/SweetAlert'
import { validateChangePassword, validateRegister } from '@/app/utils/formsValidation'

type Props = {}

const PasswordEdit = ({ observer, setObserver, showChangePassword, setShowChangePassword }: { observer: any; setObserver: any; showChangePassword: any; setShowChangePassword: any }) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const { user, setUser } = useAuth()
	const [formData, setFormData] = useState({
		password: '',
		newPassword: '',
		confirmPassword: ''
	})

	const [errors, setErrors] = useState<IErrors>({
		password: '',
		newPassword: '',
		confirmPassword: ''
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((formData) => ({
			...formData,
			[name]: value
		}))
		const fieldErrors: any = validateChangePassword({ ...formData, [name]: value })
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: fieldErrors[name]
		}))
	}

	const handleDiscard = () => {
		setFormData({ password: '', newPassword: '', confirmPassword: '' })
	}
	const handleCancel = () => {
		setShowChangePassword(!showChangePassword)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		showSweetAlertChangePassword(() => {
			const formBody = {
				password: formData.password,
				newPassword: formData.newPassword,
				email: user?.email
			}
			axios
				.put(`${rute}/auth/update-password`, formBody)
				.then((response) => {
					console.log(response)
					setObserver((observer: any) => observer + 1)
					handleDiscard()
					setShowChangePassword(!showChangePassword)
				})
				.catch((error) => {
					console.log(error)
				})
		})
	}
	return (
		<div className='flex flex-col lg:flex lg:justify-around bg-ghostwhite border border-silver/80 rounded-xl shadow-lg shadow-silver/90 gap-4 text-erieblack lg:w-full lg:h-full p-4'>
			<h3 className='font-bold text-3xl'>Change your password</h3>
			<form onSubmit={handleSubmit} className='md:flex md:justify-evenly'>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-4 pt-2 sm:pt-0 '>
						<div className='flex flex-col'>
							<label htmlFor='password' className='text-md font-semibold'>
								Current Password:
							</label>
							<input
								id='password'
								name='password'
								type='password'
								className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl'
								placeholder='Your current password'
								value={formData.password}
								onChange={handleChange}
							/>
							{errors.password && <p className='text-red-500'>{errors.password}</p>}
						</div>
						<label htmlFor='newPassword' className='text-md font-semibold'>
							New Password:
						</label>
						<input
							id='newPassword'
							name='newPassword'
							type='password'
							className='bg-silver/20 px-2 py-3 md:px-5 rounded-xl'
							placeholder='Your new password'
							value={formData.newPassword}
							onChange={handleChange}
						/>
						{errors.newPassword && <p className='text-red-500'>{errors.newPassword}</p>}
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
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
						{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
					</div>
					<div className='flex gap-5 '>
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
				</div>
			</form>
		</div>
	)
}

export default PasswordEdit
