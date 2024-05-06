import Image from 'next/image'
import { CreateAccountButton, GoogleButton } from './components/buttons/Buttons'
import Link from 'next/link'

export default function Landing() {
	return (
		<main className='pt-10 py-4 min-h-screen flex flex-col bg-duck-yellow items-center'>
			<div className=' flex flex-col flex-1 items-center gap-6 lg:flex-row sm:px-10 lg:justify-around w-full max-w-[1200px]'>
				<Image src='/advanced_parking.png' alt='app logo' className=' min-w-[200px] min-h-[200px]  rounded-full sm:w-[550px] ' width={400} height={400} />
				<div className=' flex flex-col items-center gap-6'>
					<h1>aca va a estar el mensaje de bienvenida</h1>

					<div className='flex flex-col '>
						<Link href='/register' className='flex flex-col '>
							<CreateAccountButton />
						</Link>
						<GoogleButton />
					</div>

					<Link href='/home'>continue as guest</Link>
				</div>
			</div>
			<div className='text-md sm:text-md text-center  '>
				<p>Advanced Parking &copy; 2024. All Rights Reserved.</p>
			</div>
		</main>
	)
}
