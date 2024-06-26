import { BackToHomeButton, ContactButton } from '@/app/components/buttons/Buttons'
import Image from 'next/image'
import React from 'react'

const Undefined = () => {
  return (
		<div className='flex flex-col sm:grid sm:grid-cols-2 justify-center items-center min-h-screen pt-20 px-4'>
			<div>
				<Image src='/cancelPayment.webp' alt='Cancel Image Payment' className='flex object-cover w-[200px] h-[200px] sm:w-full sm:h-full' width={500} height={500} priority />
			</div>
			<div className='flex flex-col text-center items-center gap-6'>
				<h1 className='text-5xl sm:text-7xl font-extrabold text-red-700 text-end'>Ups!!</h1>
				<p>We´re sorry, an error occurred during the payment process.</p>
				{/* <p>It looks like you canceled the payment.</p> */}
				<p>It could be a temporary error or incorrect information. You can try again.</p>
				{/* <p>The appointment will remain inactive.</p>
				<p>if this was intentional, you can try again and make a new appointment. If not, contact us for support</p> */}
				<div className='flex gap-4'>
					<BackToHomeButton />
					<ContactButton />
				</div>
				<p>Contact us for personalized assistance.</p>
				<p>Advanced Parking Support Team</p>
			</div>
		</div>
	)
}

export default Undefined