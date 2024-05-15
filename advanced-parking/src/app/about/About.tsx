import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function About() {
	return (
		<div className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 pt-24 px-4'>
			<div className='flex flex-col lg:flex-row justify-between gap-8'>
				<div className='w-full lg:w-5/12 flex flex-col justify-center'>
					<h1 className='text-3xl lg:text-6xl font-extrabold leading-9 text-erieblack '>About Us</h1>
					<p className='font-medium text-base leading-6 text-erieblack '>
						We are an application created to give the user exclusivity when searching for available parking in the urban areas of the city. We provide security, 100% insured parking in the reservation
						and with exclusive additional benefits.
					</p>
				</div>
				<div className='w-full lg:w-6/12 pt-10 flex items-center justify-center'>
					<Image src='/parking_lot_about.webp' className='w-[400px] h-[400px] rounded-full' alt='Advanced Parking Logo' priority={true} width={500} height={500} />
				</div>
			</div>
			<div>
				<h2 className='text-3xl lg:text-5xl font-extrabold leading-9 text-erieblack'>Resources</h2>
				<div className='w-full flex justify-center items-center flex-wrap'>
					<div className='min-w-max pt-10 flex justify-center flex-col items-center px-4'>
						<Image src='/icon_nextjs.webp' className=' h-20 w-20' alt='NextJs Icon' priority={true} width={500} height={500} />
						<p className='text-lg '>Next.Js</p>
					</div>
					<div className='min-w-max  pt-10 flex justify-center flex-col items-center  px-4'>
						<Image src='/icon_tailwind.webp' className=' h-20 w-20' alt='Tailwind CSS Icon' priority={true} width={500} height={500} />
						<p className='text-lg '>Tailwind CSS</p>
					</div>
					<div className='min-w-max  pt-10 flex justify-center flex-col items-center  px-4'>
						<Image src='/icon_nestjs.webp' className=' h-20 w-20' alt='NestJs Icon' priority={true} width={500} height={500} />
						<p className='text-lg '>NestJs</p>
					</div>
					<div className='min-w-max  pt-10 flex justify-center flex-col items-center  px-4'>
						<Image src='/icon_postgreSQL.webp' className=' h-20 w-20' alt='PostgreSQL Icon' priority={true} width={500} height={500} />
						<p className='text-lg '>PostgreSQL</p>
					</div>
					<div className='min-w-max pt-10 flex justify-center flex-col items-center  px-4'>
						<Image src='/icon_typescript.webp' className=' h-20 w-20' alt='PostgreSQL Icon' priority={true} width={500} height={500} />
						<p className='text-lg '>TypeScript</p>
					</div>
				</div>
			</div>
			<div className='flex lg:flex-row flex-col justify-between gap-8 pt-12'>
				<div className='w-full lg:w-5/12 flex flex-col justify-center'>
					<h2 className='text-3xl lg:text-5xl font-extrabold leading-9 text-erieblack pb-4'>Meet the brains</h2>
					<p className='font-medium text-base leading-6 text-erieblack'>
						We are a work team that has constant communication, we have the ability to resolve conflicts and our spirit of collaboration has been fundamental to the success of this project. This has
						helped strengthen bonds and increase motivation. We are an incredible team and we are confident that together we will achieve great things in the future.
					</p>
					<p className='font-medium text-base leading-6 text-erieblack pt-2'>
						You can find us on our LinkedIn profile or you can go to{' '}
						<Link href='/contact' className='text-erieblack font-extrabold underline decoration-silver'>
							Contact
						</Link>{' '}
						and send us a message.
					</p>
				</div>
				<div className='w-full lg:w-8/12 lg:pt-8'>
					<div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md'>
						<Link target='_blank' href='https://www.linkedin.com/in/gabriel-gotlib-5855197b/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image src='/GabrielGotlib.webp' className='md:block hidden rounded-full' alt='Gabriel featured Image' width={150} height={150} priority={true} />
							<Image className='md:hidden block rounded-full' src='/GabrielGotlib.webp' alt='Gabriel featured Image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Gabriel Gotlib</p>
						</Link>
						<Link target='_blank' href='https://www.linkedin.com/in/mlmarce/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image src='/MarceloLencina.webp' className='md:block hidden rounded-full' alt='Marcelo featured Image' width={150} height={150} priority={true} />
							<Image src='/MarceloLencina.webp' className='md:hidden block rounded-full' alt='Marcelo featured Image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Marcelo Lencina</p>
						</Link>
						<Link target='_blank' href='https://www.linkedin.com/in/sim%C3%B3n-salas-seeber-138112144/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image className='md:block hidden rounded-full' src='/SimonSalas.webp' alt='Simon featued Image' width={150} height={150} priority={true} />
							<Image className='md:hidden block rounded-full' src='/SimonSalas.webp' alt='Simon featued Image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Simón Salas</p>
						</Link>
						<Link target='_blank' href='https://www.linkedin.com/in/mario-gutierrez-tello/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image className='md:block hidden rounded-full' src='/MarioGutierrez.webp' alt='Mario featured image' width={150} height={150} priority={true} />
							<Image className='md:hidden block rounded-full' src='/MarioGutierrez.webp' alt='Mario featured image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Mario Gutiérrez</p>
						</Link>
						<Link target='_blank' href='https://www.linkedin.com/in/jose-salvador-coledani-grillo-10b857278/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image className='md:block hidden rounded-full' src='/JoseColedani.webp' alt='Jose featured image' width={150} height={150} priority={true} />
							<Image className='md:hidden block rounded-full' src='/JoseColedani.webp' alt='Jose featured image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Jose Coledani</p>
						</Link>
						<Link target='_blank' href='https://www.linkedin.com/in/sebastianibarguen/' className='p-4 pb-6 flex justify-center flex-col items-center'>
							<Image className='md:block hidden rounded-full' src='/SebastianIbarguen.webp' alt='Sebastian featured image' width={150} height={150} priority={true} />
							<Image className='md:hidden block rounded-full' src='/SebastianIbarguen.webp' alt='Sebastian featured image' width={150} height={150} priority={true} />
							<p className='font-medium text-base leading-5 text-gray-800 mt-4'>Sebastian Ibargüen</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
