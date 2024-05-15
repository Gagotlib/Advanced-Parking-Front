import React from 'react'
import { subscriptionsMock } from '@/app/utils/subscriptionsMock'
import { BackToSubscriptionsButton, HireButton } from '@/app/components/buttons/Buttons'
import { CheckIcon } from '@/app/components/icons/icons'

import Link from 'next/link'

export const SubscriptionDetails = ({ params }: { params: { slug: string } }) => {
	const subscription = subscriptionsMock.find((subscription) => subscription.name === params.slug)

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>

				<h1 className='text-4xl sm:text-6xl font-bold'>Suscription {subscription?.name}</h1>
				<p className='text-xl '>{subscription?.longDescription}</p>

				<ul>
					<li className='flex gap-2 items-center mb-4 w-full justify-start'>
						<CheckIcon />
						<p>100% insured parking in the reservation</p>
					</li>
					<li className='flex gap-2 items-center mb-4 w-full justify-start'>
						<CheckIcon />

						<p >Security 24hr</p>

					</li>
					<li className='flex gap-2 items-center mb-4 w-full justify-start'>
						<CheckIcon />
						<p>Automated check-in and check-out</p>
					</li>
				</ul>

				<p className='font-semibold text-2xl '>${subscription?.price} per Month</p>

				<HireButton />
				<BackToSubscriptionsButton />
			</div>
		</div>
	)
}

export default SubscriptionDetails
