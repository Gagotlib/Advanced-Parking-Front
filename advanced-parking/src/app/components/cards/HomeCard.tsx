import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IcardProp {
	href: string
	img_href: string
	alt: string
	text: string
	text2: string
}

export const HomeCard = ({ cardProps }: { cardProps: IcardProp }) => {
	return (
		<div className='flex flex-col lg:flex-row items-start justify-start  rounded-3xl w-11/12 h-60 shadow-2xl dark:shadow-ghostwhite  '>
			<Link href={cardProps.href} className='w-full'>
				<div className='relative flex justify-center lg:justify-between items-center w-full h-60  lg:flex-row lg:w-full  lg:[&>img]:hover:filter-none'>
					<Image src={cardProps.img_href} alt={cardProps.alt} width={600} height={200} className='shadow-xl object-cover rounded-3xl h-full  lg:filter lg:grayscale brightness-70 blur-[2px] ' />
					<div className='absolute lg:flex-col lg:flex-1 lg:relative lg:text-black lg:dark:text-ghostwhite text-white text-center '>
						<p className='text-4xl font-medium'>{cardProps.text}</p>
						<br />
						<p className='hidden lg:block text-xl font-medium'>{cardProps.text2}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
