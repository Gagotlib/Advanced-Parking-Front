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
		<div className='flex flex-col items-start justify-start rounded-3xl w-11/12 h-40 shadow-2xl '>
			<Link href={cardProps.href}>
				<figure className='relative  flex justify-center items-center w-full h-40'>
					<Image src={cardProps.img_href} alt={cardProps.alt} width={600} height={200} className='shadow-xl object-cover rounded-3xl h-full' />
					<figcaption className='absolute'>
						<p className='text-3xl text-white text-center'>{cardProps.text}</p>
					</figcaption>
				</figure>
			</Link>
		</div>
	)
}

export default HomeCard
