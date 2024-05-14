'use client'
import Image from 'next/image'
import { CreateAccountButton } from './components/buttons/Buttons'
import Link from 'next/link'
import { GoogleButton } from './components/buttons/GoogleButton'
import { useSession } from 'next-auth/react'

export default function Landing() {
	const { data: session } = useSession()
console.log('sessuin desde landing', session?.user)

	return (
		<main className='bg-duck-yellow pt-0 py-4 min-h-screen flex flex-col items-center'>
			<div className='flex flex-col flex-1 items-center md:gap-6 lg:flex-row sm:px-10 lg:justify-around w-full'>
				<Image src='/advanced_parking.png' alt='advanced parking app' className='min-w-[200px] min-h-[200px] sm:w-[550px] ' width={400} height={400} priority={true} />

				<div className='flex flex-col items-center gap-4 text-pretty text-center '>
					<h1 className='text-erieblack text-3xl font-bold '>
						Welcome to your preferred parking!
						<br />
						Your space awaits you.
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
