import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ISubscription {
	name: string
	shortDescription: string
	longDescription: string
	price: number
	color: string
	img_href: string
}

export const SubscriptionsCard = ({ subscription }: { subscription: ISubscription }) => {
	const color = subscription.color
	return (
		<div className='flex flex-col items-start justify-start rounded-3xl w-11/12 h-40 shadow-2xl filter-none sm:filter grayscale blur-sm hover:filter-none '>
			<Link href={`/subscriptions/${subscription.name}`}>
				<figure className='relative  flex justify-center items-center w-full h-40'>
					<Image src={subscription.img_href} alt={subscription.name} width={600} height={200} className='shadow-xl object-cover rounded-3xl h-full ' />
					<figcaption className='absolute'>
						<p className='font-bold text-3xl text-white text-center'>{subscription.name}</p>
						<p className=' text-white text-center'>{subscription.shortDescription}</p>
						<p className='  text-white text-center'>${subscription.price} / mes</p>
					</figcaption>
				</figure>
			</Link>
		</div>
	)
}

export default SubscriptionsCard
