import React from 'react'
import { subscriptionsMock } from '../utils/subscriptionsMock'
import SubscriptionsCard from '../components/cards/SubscriptionsCard'
import Link from 'next/link'
type Props = {}

const Subscriptions = (props: Props) => {
	return (
		<div className='flex flex-col min-h-screen '>
			<div className='h-16 bg-duck-yellow w-full'>ACA va estar el Navbar</div>
			<div className='flex flex-col min-h-screen py-4 m-0 items-center justify-start'>
				<div className='rounded-lg flex flex-col w-full gap-4  items-center justify-start'>
					{subscriptionsMock.map((subscription) => (
						<SubscriptionsCard key={subscription.name} subscription={subscription} />
					))}
				</div>

			</div>
		</div>
	)
}

export default Subscriptions
