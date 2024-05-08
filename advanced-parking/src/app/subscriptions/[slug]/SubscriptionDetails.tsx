import React from 'react'
import { subscriptionsMock } from '@/app/utils/subscriptionsMock'
import { BackToSubscriptionsButton, HireButton } from '@/app/components/buttons/Buttons'
import { CheckIcon } from '@/app/components/icons/icons'
import Navbar from '@/app/components/navbar/Navbar'

export const SubscriptionDetails = ({ params }: { params: { slug: string } }) => {
	const subscription = subscriptionsMock.find((subscription) => subscription.name === params.slug)

	return (
		<div className='flex flex-col min-h-screen '>
			<Navbar />
			<div className='flex flex-col p-4 m-0 items-center justify-start gap-4 text-center'>
				<h1>Subscripción {subscription?.name}</h1>
				<p>{subscription?.longDescription}</p>
				<ul>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Lugar asegurado</p>
					</li>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Seguridad las 24hs</p>
					</li>
					<li className='flex gap-2 items-center'>
						<CheckIcon />
						<p>Ingreso y Salida automatizada</p>
					</li>
				</ul>
				<p>${subscription?.price} por mes</p>
				<HireButton />
				<BackToSubscriptionsButton />
			</div>
		</div>
	)
}

export default SubscriptionDetails
