import React from 'react'
import { subscriptionsMock } from '../utils/subscriptionsMock'
import SubscriptionsCard from '../components/cards/SubscriptionsCard'
import { BackToHomeButton } from '../components/buttons/Buttons'
import Navbar from '../components/navbar/Navbar'

export const Subscriptions = () => {
	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col py-4 sm:mt-14 items-center justify-start'>
				<div className='rounded-lg flex flex-col w-full gap-4 items-center justify-start sm:flex-row'>
					{subscriptionsMock.map((subscription) => (
						<SubscriptionsCard key={subscription.name} subscription={subscription} />
					))}
				</div>
				<br />
				<BackToHomeButton />
			</div>
		</div>
	)
}

export default Subscriptions
