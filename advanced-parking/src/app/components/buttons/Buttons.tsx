import Link from 'next/link'
import React from 'react'

export const CreateAccountButton = () => {
	return (
		<button
			type='button'
			className='py-2.5 px-5 me-2 mb-2 text-md sm:text-xl font-medium text-ghostwhite focus:outline-none bg-yaleblue  rounded-lg border border-silver hover:bg-yaleblue/90  hover:text-ghostwhite focus:z-10 focus:ring-4 focus:ring-silver-100'
		>
			Create an account
		</button>
	)
}

export const BackToHomeButton = () => {
	return (
		<button
			type='button'
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none"
		>
			<Link href='/home'>Back to home</Link>
		</button>
	)
}

export const BackToSubscriptionsButton = () => {
	return (
		<button
			type='button'
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none"
		>
			<Link href='/subscriptions'>Back to subscriptions</Link>
		</button>
	)
}

export const BackToOurParkingsButton = () => {
	return (
		<button
			type='button'
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none"
		>
			<Link href='/ourparkings'>Back to our parkings</Link>
		</button>
	)
}

export const HireButton = () => {
	return (
		<button
			type='button'
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none">
			<Link href='#'>Hire</Link>
		</button>
	)
}

export const SendButton = () => {
	return (
		<button
			type="submit"
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none">
			Send message
		</button>
	)
}

export const ReserveButton = () => {
	return (
		<button
			type="submit"
			className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90  sm:w-fit focus:ring-4 focus:outline-none">
			<Link href='/ourparkings'>
				Reserve
			</Link>
		</button>
	)
}

export const ContactButton = () => {
	return (
		<button
			type='button'
			className="py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none"
		>
			<Link href='/contact'>Contact us</Link>
		</button>
	)
}

export const LoginButton = () => {
	return (
		<button
			type='button'
			className="py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none"
		>
			<Link href='/login'>Login</Link>
		</button>
	)
}

export const SelectSlotButton = () => {
	return (
		<button
			type='button'
			className='py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
		>
			Select slot
		</button>
	)
}



