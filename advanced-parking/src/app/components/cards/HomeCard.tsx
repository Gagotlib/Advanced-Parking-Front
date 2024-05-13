import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IcardProp {
	href: string
	img_href: string
	alt: string
	text: string
}

export const HomeCard = ({ cardProps }: { cardProps: IcardProp }) => {
	return (
		<div className='flex flex-col lg:flex-row items-start justify-start  rounded-3xl w-11/12 h-40 shadow-2xl'>
			<Link href={cardProps.href} className='w-full'>
				<div className='relative flex justify-center lg:justify-between items-center w-full h-40  lg:flex-row lg:w-full  lg:[&>img]:hover:filter-none'>
					<Image
						src={cardProps.img_href}
						alt={cardProps.alt}
						width={600}
						height={200}
						className='shadow-xl object-cover rounded-3xl h-full  filter-none lg:filter grayscale brightness-50 blur-[2px] '
					/>
					<div className='absolute lg:flex-col lg:flex-1 lg:relative lg:text-black text-white text-center '>
						<p className='text-4xl font-medium'>{cardProps.text}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
