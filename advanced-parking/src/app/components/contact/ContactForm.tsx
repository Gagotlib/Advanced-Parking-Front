'use client'

import Toast from '@/app/components/alerts/Toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SendButton } from '../buttons/Buttons'
import axios from 'axios'

function ContactForm() {
	const [showToast, setShowToast] = useState(false)
	const router = useRouter()
	useEffect(() => {
		if (showToast) {
			const timeout = setTimeout(() => {
				setShowToast(false)
				router.push('/home')
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [showToast, router])

	const [formData, setFormData] = useState({
		user_email: '',
		user_name: '',
		user_message: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((formData) => ({
			...formData,
			[name]: value
		}))
	}

	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((formData) => ({
			...formData,
			[name]: value
		}))
	}

	function handleOnSubmit(e: { preventDefault: () => void }) {
		e.preventDefault()
		setShowToast(true)
		const rute = process.env.NEXT_PUBLIC_BACK_API_URL
		axios
			.post(`${rute}/email-sender/contact-form`, formData)
			.then((response) => {
				console.log(response)
				setFormData({
					user_email: '',
					user_name: '',
					user_message: ''
				})
			})
			.catch((error) => console.log(error))

		return
	}

	return (
		<section className='pt-20 dark:text-ghostwhite'>
			<div className='py-4 px-4 mx-auto max-w-screen-md dark:text-ghostwhite'>
				<h1 className='mb-4 text-4xl font-extrabold text-center text-erieblack sm:text-5xl dark:text-ghostwhite'>Contact Us</h1>
				{showToast && <Toast message='Your message has been sent correctly' type='success' />}
				<p className='mb-8 lg:mb-16 font-medium italic text-center text-erieblack sm:text-lg dark:text-ghostwhite'>
					Got a technical issue? Want to send feedback about a this project? Need details about our suscriptions plan? Let us know.
				</p>
				<div className='border-silver rounded-lg p-4 m-4 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/50'>
					<form className='space-y-8' onSubmit={handleOnSubmit}>
						<div>
							<label htmlFor='email' id='email' className='block mb-2 text-sm font-medium text-erieblack dark:text-ghostwhite'>
								Your email
							</label>
							<input
								name='user_email'
								value={formData.user_email}
								onChange={handleChange}
								type='email'
								id='email'
								className='shadow-sm bg-ghostwhite border border-yaleblue text-erieblack text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
								placeholder='name@email.com'
								required
							/>
						</div>
						<div>
							<label htmlFor='subject' className='block mb-2 text-sm font-medium text-erieblack dark:text-ghostwhite'>
								Your Name
							</label>
							<input
								name='user_name'
								value={formData.user_name}
								onChange={handleChange}
								type='text'
								id='subject'
								className='block p-3 w-full text-sm text-erieblack bg-ghostwhite rounded-lg border border-yaleblue shadow-sm '
								placeholder='what is your name?'
								required
							/>
						</div>
						<div className='sm:col-span-2'>
							<label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-ghostwhite'>
								Your message
							</label>
							<textarea
								value={formData.user_message}
								onChange={handleChangeTextArea}
								name='user_message'
								id='message'
								className='block p-2.5 w-full text-sm text-erieblack bg-ghostwhite rounded-lg shadow-sm border border-yaleblue resize-none'
								placeholder='Leave a comment...'
							></textarea>
						</div>
						<button type='submit' className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none'>
							Send message
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default ContactForm
