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
		<div className='flex flex-col sm:flex-row items-start justify-start  rounded-3xl w-11/12 h-40 shadow-2xl'>
			<Link href={cardProps.href} className='w-full'>
				<div className='relative flex justify-center sm:justify-between sm pr-4 items-center w-full h-40  sm:flex-row sm:w-full  sm:[&>img]:hover:filter-none'>
					<Image
						src={cardProps.img_href}
						alt={cardProps.alt}
						width={600}
						height={200}
						className='shadow-xl object-cover rounded-3xl h-full filter-none sm:filter grayscale brightness-50 blur-[2px] '
					/>
					<div className='absolute sm:flex-col sm:relative sm:text-black text-white text-center '>
						<p className='text-3xl'>{cardProps.text}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
