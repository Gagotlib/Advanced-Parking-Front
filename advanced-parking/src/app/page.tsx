'use client'
import Image from 'next/image'
import { CreateAccountButton } from './components/buttons/Buttons'
import Link from 'next/link'
import { GoogleButton } from './components/buttons/GoogleButton'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './context/AuthContext'

export default function Landing() {
	const rute = process.env.BACK_API_URL
	const { data: session } = useSession()
	const { user, setUser } = useAuth()
	const { token, setToken } = useAuth()

	useEffect(() => {
		// session ? console.log('sesion guardada por google, consologeado desde landing', session?.user) : console.log('no hay sesion')
		if (session) {
			const newUser = session?.user

			axios
				.post(`${rute}/auth/signup-auth0`, newUser)
				.then((response) => response.data)
				.then((data) => {
					setUser(data.userData)
					setToken(data.token)
					localStorage.setItem('authToken', data.token)
					localStorage.setItem('user', JSON.stringify(data.userData))
					// setShowToast(true))
				})
		} else {
			// console.log('NO HAY sesion')
		}
	}, [session])

	return (
		<main className='bg-duck-yellow min-h-screen flex flex-col items-center'>
			<div className='flex flex-col flex-1 items-center md:gap-6 lg:flex-row sm:px-10 lg:justify-around w-full'>
				<Image src='/landing_advanced.webp' alt='advanced parking app' className='min-w-[200px] min-h-[200px] sm:w-[550px]' width={380} height={400} priority />
				<div className='flex flex-col items-center gap-4 text-pretty text-center '>
					<h1 className='text-erieblack text-3xl font-bold '>
						Welcome to a new parking solution!
						<br />
						Book your slot in only 3 steps.
					</h1>

					<div className='flex flex-col'>
						<Link href='/register' className='flex flex-col '>
							<CreateAccountButton />
						</Link>
						<GoogleButton />
					</div>
					<Link href='/home' className='text-erieblack font-medium text-base italic'>
						Continue as guest
					</Link>
				</div>
			</div>
		</main>
	)
}
