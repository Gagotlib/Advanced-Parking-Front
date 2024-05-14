import Link from 'next/link'
import React from 'react'

export const GoogleButton = () => {
	return (
		<button
			type='button'
			className='text-ghostwhite bg-yaleblue hover:bg-yaleblue/90 focus:ring-4 focus:outline-none focus:ring-yaleblue/50 font-medium rounded-lg text-md sm:text-xl px-5 py-2.5 text-center inline-flex items-center me-2 mb-2'
		>
			<svg
				className='w-4 h-4 me-2'
				aria-hidden='true'
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				viewBox='0 0 18 19'>
				<path
					fillRule='evenodd'
					d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
					clipRule='evenodd'
				/>
			</svg>
			Sign in with Google
		</button>
	)
}

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




