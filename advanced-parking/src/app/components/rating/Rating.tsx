'use client'

import Link from 'next/link'
import React, { ChangeEventHandler, useState } from 'react'
import { BackToHomeButton } from '../buttons/Buttons'
import { useAuth } from '@/app/context/AuthContext'
import axios from 'axios'

function Rating() {
	const [openModal, setOpenModal] = useState(false)
	const [rating, setRating] = useState(5)
	const [message, setMessage] = useState('')
	const { user } = useAuth()
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

	//Peticion Post al backend para guardar el mensaje del usuario
	const handleRateClick = () => {
		const data = {
			user_id: user?.id,
			message: message,
			rating: rating
		}
		axios
			.post(`${rute}/reviews`, data)
			.then((response) => {
				console.log(response)
				setMessage('')
				setRating(0)
				handleOpenModal()
			})
			.catch((error) => console.log(error))
	}
	const handleMessage = (e: any) => {
		console.log(e)
		setMessage((prev) => (prev = e.target?.value))
	}
	const handleChange = (index: any) => {
		setRating(index + 1)
	}

	const handleOpenModal = () => {
		setOpenModal(!openModal)
	}

	return (
		<div className='min-h-screen bg-ghostwhite py-6 px-6 flex flex-col justify-center sm:py-12 pt-24'>
			<div className='py-3 sm:max-w-xl sm:mx-auto'>
				<div className='bg-ghostwhite min-w-1xl flex flex-col rounded-xl shadow-xl shadow-silver/90  border border-silver'>
					<div className='px-12 py-5'>
						<h2 className='text-erieblack text-3xl font-bold antialiased sm:text-4xl'>Your opinion matters to us!</h2>
					</div>
					<div className='bg-silver/50 w-full flex flex-col items-center border border-yaleblue rounded-lg'>
						<div className='flex flex-col items-center py-6 space-y-3'>
							<span className='text-lg text-erieblack text-center'>What did you think of the booking process?</span>
							<div className='rating'>
								{[...Array(5)].map((_, index) => (
									<input key={index} type='radio' name='rating' className='mask mask-star-2 bg-orange-400' checked={index === rating - 1} onClick={() => handleChange(index)} />
								))}
							</div>
						</div>
						<div className='w-3/4 flex flex-col'>
							<textarea
								name='message'
								className='p-4 text-erieblack rounded-xl resize-none dark:text-slate-200'
								onChange={(e) => handleMessage(e)}
								value={message}
								placeholder='Leave a message, if you want'
							></textarea>
							<button className='py-3 my-8 text-lg bg-yaleblue rounded-xl text-ghostwhite font-semibold' onClick={handleRateClick}>
								Rate
							</button>
							{openModal && (
								<dialog open className='modal modal-bottom sm:modal-middle'>
									<div className='modal-box'>
										<h3 className='font-bold text-lg'>Thank you for your feedback. </h3>
										<p className='py-4'>We appreciate your time and effort in helping us improve our service.</p>
										<div className='flex justify-between'>
											<div className='modal-action'>
												<BackToHomeButton />
											</div>
											<div className='modal-action'>
												<button
													className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
													onClick={handleOpenModal}
												>
													Rate again
												</button>
											</div>
										</div>
									</div>
								</dialog>
							)}
						</div>
					</div>
					<div className='h-20 flex items-center justify-center'>
						<Link href='/home' className='text-erieblack text-sm sm:text-md'>
							Maybe later
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Rating
