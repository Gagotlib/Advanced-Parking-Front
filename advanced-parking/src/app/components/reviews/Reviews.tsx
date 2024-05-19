import Image from 'next/image'
import React from 'react'
import ReviewCard from './ReviewCard'

function Reviews() {
	const reviews = [
		{
			name: 'Juan',
			review: '"Really good service"',
			img_href: '/user1.jpg'
		},
		{
			name: 'Laura',
			review: '"Fair prices"',
			img_href: '/user2.jpg'
		},
		{ name: 'Roberto', review: '"They solved my problem"', img_href: '/user3.jpg' }
	]

	return (
		<div className='pt-2 w-full max-w-screen'>
			<section id='testimonials' aria-label='What our customers are saying' className=' py-4 sm:py-10'>
				<div className='mx-auto max-w-7xl px-0 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl text-center'>
						<h2 className='text-2xl font-bold tracking-tight text-erieblack sm:text-5xl'>What our users say</h2>
					</div>
					<ul role='list' className='mt-10 px-4 pb-10 grid gap-6 md:grid md:gap-8 md:mt-10 md:max-w-none md:grid-cols-2 lg:grid-cols-3'>
						{reviews.map((review, index) => (
							<ReviewCard key={index} review={review} />
						))}
					</ul>
				</div>
			</section>
		</div>
	)
}

export default Reviews
