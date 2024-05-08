import Image from 'next/image'
import { CreateAccountButton, GoogleButton } from './components/buttons/Buttons'
import Link from 'next/link'

export default function Landing() {
	return (
		<main className='bg-erieblack pt-0 py-4 min-h-screen flex flex-col items-center'>
			<div className='flex flex-col flex-1 items-center gap-6 lg:flex-row sm:px-10 lg:justify-around w-full max-w-[1200px]'>
				<Image
					src='/advanced_parking_1.webp'
					alt='advanced parking app'
					className=' min-w-[200px] min-h-[200px] rounded-full sm:w-[550px]'
					width={400}
					height={400}
				/>
				<div className='flex flex-col items-center gap-10 px-4 text-pretty'>
					<h1
						className='text-ghostwhite text-3xl font-bold'>
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
					<Link href='/home' className='text-ghostwhite font-medium text-base'>Continue as guest</Link>
				</div>
			</div>
			<div className='text-md text-ghostwhite font-medium sm:text-md text-center text-xl'>
				<p className=''>Advanced Parking &copy; 2024. All Rights Reserved.</p>
			</div>
		</main>
	)
}
