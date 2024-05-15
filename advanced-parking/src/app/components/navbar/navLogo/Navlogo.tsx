import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navlogo() {
	return (
		<div className='max-w-screen-xl flex'>
			<Image src='/logo_advanced.webp'
				className='h-[75px] w-[75px]'
				alt='Advanced Parking Logo'
				width={500}
				height={500}
				priority
			/>
			<Link href='/home' className='flex'>
				<span className='self-center text-2xl font-semibold lg:whitespace-nowrap text-erieblack'>Advanced Parking</span>
			</Link>
		</div>
	)
}

export default Navlogo
