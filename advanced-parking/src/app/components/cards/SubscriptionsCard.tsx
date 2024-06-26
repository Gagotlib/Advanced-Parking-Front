import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface ISubscription {
	name: string
	shortDescription: string
	longDescription: string
	price: number
	img_href: string
}

export const SubscriptionsCard = ({ subscription }: { subscription: ISubscription }) => {
	return (
		<div className='flex flex-col items-start justify-start rounded-3xl w-12/12 h-40 sm:h-96 shadow-2xl mx-4 bg-ghostwhite dark:bg-ghostwhite/80'>
			<Link href={`/subscriptions/${subscription.name}`} className='w-full h-full flex justify-center'>
				<div className='relative flex flex-col justify-center sm:justify-around items-center w-full h-40 sm:flex-col sm:w-full sm:gap-8 sm:[&>img]:hover:filter-none'>
					<Image
						src={subscription.img_href}
						alt={subscription.name}
						width={600}
						height={200}
						className='shadow-xl object-cover rounded-3xl sm:rounded-b-sm h-full filter-none sm:filter grayscale brightness-50 blur-[2px] hover:filter-none'
					/>
					<div className='absolute sm:flex-col sm:relative sm:text-black text-white text-center'>
						<p className='font-bold text-3xl'>{subscription.name}</p>
						<p className=''>{subscription.shortDescription}</p>
						<p className='text-3xl font-bold'>${subscription.price} / Month</p>
					</div>
					<button
						className="hidden sm:flex text-ghostwhite bg-yaleblue hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
						Details
					</button>
				</div>
			</Link>
		</div>
	)
}

export default SubscriptionsCard
