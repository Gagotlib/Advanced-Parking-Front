import React from 'react'
import { subscriptionsMock } from '@/app/utils/subscriptionsMock'

export const SubscriptionDetails = ({ params }: { params: { slug: string } }) => {
	const subscription = subscriptionsMock.find((subscription) => subscription.name === params.slug)

	return (
		<div>
			<h1>subscriptionDetails</h1>
			<h1>{subscription?.name}</h1>
			<p>{subscription?.longDescription}</p>
			<p>{subscription?.price}</p>
		</div>
	)
}

export default SubscriptionDetails
