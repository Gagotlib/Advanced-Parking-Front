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
		<div className='flex flex-col sm:flex-row items-start justify-start  rounded-3xl w-11/12 h-40 shadow-2xl'>
			<Link href={`/subscriptions/${subscription.name}`} className='w-full'>
				<div className='relative flex justify-center sm:justify-around items-center w-full h-40  sm:flex-row sm:w-full  sm:[&>img]:hover:filter-none '>
					<Image
						src={subscription.img_href}
						alt={subscription.name}
						width={600}
						height={200}
						className='shadow-xl object-cover rounded-3xl h-full filter-none sm:filter grayscale brightness-50 blur-[2px] hover:filter-none'
					/>
					<div className='absolute sm:flex-col sm:relative sm:text-black text-white text-center  '>
						<p className='font-bold text-3xl '>{subscription.name}</p>
						<p className=''>{subscription.shortDescription}</p>
						<p className=''>${subscription.price} / mes</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default SubscriptionsCard
