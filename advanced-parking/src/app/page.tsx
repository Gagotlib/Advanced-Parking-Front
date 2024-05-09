import Image from 'next/image'
import { CreateAccountButton, GoogleButton } from './components/buttons/Buttons'
import Link from 'next/link'

export default function Landing() {
	return (
		<main className='bg-duck-yellow pt-0 py-4 min-h-screen flex flex-col items-center'>
			<div className='flex flex-col flex-1 items-center md:gap-6 lg:flex-row sm:px-10 lg:justify-around w-full'>
				<Image
					src='/advanced_parking.png'
					alt='advanced parking app'
					className='min-w-[200px] min-h-[200px] sm:w-[550px] '
					width={400}
					height={400}
				/>
				<div className='flex flex-col items-center gap-6 text-pretty'>
					<div className='flex flex-col gap-3'>
						<p
							className='text-erieblack text-5xl font-bold'>
							Welcome to your preferred parking!</p>
						<p className='text-erieblack text-5xl font-bold'>
							Your space awaits you.
						</p>
					</div>
					<div className='flex flex-col'>
						<Link href='/register' className='flex flex-col '>
							<CreateAccountButton />
						</Link>
						<GoogleButton />
					</div>
					<Link href='/home' className='text-erieblack font-medium text-base italic'>Continue as guest</Link>
				</div>
			</div>
		</main >
	)
}
