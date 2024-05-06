'use client'

import { Slide, ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProps {
	message: string
	type: 'success' | 'error' | 'info' | 'warning'
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
	useEffect(() => {
		toast[type](message, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			transition: Slide
		})
	}, [type, message])

	return (
		<ToastContainer
			position='top-center'
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='light'
			transition={Slide}
		/>
	)
}
export default Toast
