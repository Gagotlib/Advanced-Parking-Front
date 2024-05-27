import { useAuth } from '@/app/context/AuthContext'
import axios from 'axios'
import React, { useState } from 'react'
import { showSweetAlert } from '../alerts/SweetAlert'

function ProfileChangePhoto() {
	const { user, setUser } = useAuth()
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [showChangeImage, setShowChangeImage] = useState(false)

	const handleChangeImage = () => {
		setShowChangeImage(!showChangeImage)
	}

	const handleSendNewImage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const fileInput = document.getElementById('fileInput') as HTMLInputElement
		const file = fileInput?.files ? fileInput.files[0] : null
		// console.log('fileinput', file)
		if (!file) {
			console.error('No file selected')
			return
		}

		const formData = new FormData()
		formData.append('file', file)
		// for (let key of formData.keys()) {
		// 	console.log(key, formData.get(key))
		// }

		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		if (!logedUser) {
			console.error('No logged user found')
			return
		}
		const token = localStorage.getItem('authToken')
		if (!token) {
			console.error('No auth token found')
			return
		}
		// funcion que lleve el archivo al back
		try {
			const response = await axios.post(`${rute}/files/profile-image/${logedUser.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})
			// const updatedUser = { ...logedUser, image: response.data.image }
			setUser(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			console.log('imagen update :', response.data)
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	//Función petición eliminar foto.
	const handleDeleteImage = () => {
		// funcion que permita hacer user.image="" y se guarde en bd
		showSweetAlert(() => {
			const userString = localStorage.getItem('user')
			const logedUser = userString ? JSON.parse(userString) : null
			const token = localStorage.getItem('authToken')
			axios.delete(`${rute}/files/profile-image/${logedUser.id}`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})

			const updatedUser = { ...logedUser, image: '' }
			setUser(updatedUser)
			localStorage.setItem('user', JSON.stringify(updatedUser))
		})
	}

	return (
		<div>
			<div className='flex flex-col gap-2 sm:ml-2 md:flex md:flex-row'>
				<button
					type='button'
					className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
					onClick={handleChangeImage}
				>
					Change picture
				</button>
				<button
					type='button'
					className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
					onClick={handleDeleteImage}
				>
					Delete picture
				</button>
			</div>
			{showChangeImage && (
				<form className='flex gap-1' onSubmit={handleSendNewImage}>
					<input id='fileInput' type='file' className='file-input file-input-bordered file-input-warning w-full max-w-xs' name='file' accept='image/*' required></input>
					<button
						type='submit'
						className='py-2 px-2 text-base h-12 font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'
					>
						Upload File
					</button>
				</form>
			)}
		</div>
	)
}

export default ProfileChangePhoto
