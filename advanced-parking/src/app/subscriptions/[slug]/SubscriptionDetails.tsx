import React from 'react'
import { subscriptionsMock } from '@/app/utils/subscriptionsMock'
import { BackToSubscriptionsButton, HireButton } from '@/app/components/buttons/Buttons'

export const SubscriptionDetails = ({ params }: { params: { slug: string } }) => {
	const subscription = subscriptionsMock.find((subscription) => subscription.name === params.slug)

	return (
		<div className='flex flex-col min-h-screen '>
			<div className='h-16 bg-duck-yellow w-full'>ACA va estar el Navbar</div>
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>
				<h1>Subscripción {subscription?.name}</h1>
				<p>{subscription?.longDescription}</p>
				<p>${subscription?.price} por mes</p>
				<HireButton />
				<BackToSubscriptionsButton />
			</div>
		</div>
	)
}

export default SubscriptionDetails
