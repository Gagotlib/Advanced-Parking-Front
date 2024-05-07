import Link from 'next/link'
import React from 'react'

export const GoogleButton = () => {
	return (
		<button
			type='button'
			className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md sm:text-2xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2'
		>
			<svg className='w-4 h-4 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 19'>
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
			className='py-2.5 px-5 me-2 mb-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100'
		>
			Create Account
		</button>
	)
}

export const BackToHomeButton = () => {
	return (
		<button
			type='button'
			className='py-2.5 px-5 my-8 me-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-duck-yellow rounded-lg border border-gray-200 hover:bg-yellow-300  focus:z-10 focus:ring-4 focus:ring-gray-100 shadow-xl'
		>
			<Link href='/home'>back to home</Link>
		</button>
	)
}
export const BackToSubscriptionsButton = () => {
	return (
		<button
			type='button'
			className='py-2.5 px-5 my-8 me-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-duck-yellow rounded-lg border border-gray-200 hover:bg-yellow-300  focus:z-10 focus:ring-4 focus:ring-gray-100 shadow-xl'
		>
			<Link href='/subscriptions'>back to subscriptions</Link>
		</button>
	)
}
export const BackToOurParkingsButton = () => {
	return (
		<button
			type='button'
			className='py-2.5 px-5 my-8 me-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-duck-yellow rounded-lg border border-gray-200 hover:bg-yellow-300  focus:z-10 focus:ring-4 focus:ring-gray-100 shadow-xl'
		>
			<Link href='/ourparkings'>back to our parkings</Link>
		</button>
	)
}

export const HireButton = () => {
	return (
		<button
			type='button'
			className='py-2.5 px-5 my-8 me-2 text-md sm:text-2xl font-medium text-gray-900 focus:outline-none bg-duck-yellow rounded-lg border border-gray-200 hover:bg-yellow-300  focus:z-10 focus:ring-4 focus:ring-gray-100 shadow-xl'
		>
			<Link href=''>Contratar</Link>
		</button>
	)
}
