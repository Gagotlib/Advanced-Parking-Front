import Image from 'next/image'
import React, { useState } from 'react'
import ReviewCard from './ReviewCard'



function Reviews() {
	const reviews = [
		// Llamada al backend para traerme todas las reviews
		//* asi va a llegar
	// {
	// 		id:"213q2132wed2er",
	// 		message: 'I used to spend hours looking for a parking spot, especially downtown. This app has made it so much easier. I can find a parking spot quickly and easily, even on the busiest days.',
	// 		rating: 0,
	// 		user: {
	// 			user_name: 'Juan Duarte',
	// 			user_img: '/user1.webp',
	// 		}
	// 	}


		{
			name: 'Juan Duarte',
			review: 'I used to spend hours looking for a parking spot, especially downtown. This app has made it so much easier. I can find a parking spot quickly and easily, even on the busiest days.',
			img_href: '/user1.webp'
		},
		{
			name: 'Laura Gimenez',
			review: 'This app guides me through the process step-by-step and helps me do it without any problems. It´s super intuitive and easy to use, even for someone like me who isn´t very tech-savvy. Plus, the parking spot finder feature is super helpful. It´s helped me find a place to park quickly, even during rush hour.',
			img_href: '/user2.webp'
		},
		{
			name: 'Roberto Sanchez',
			review: 'If you´re looking for a parking reversal app that is easy to use, effective, and reliable, this is the perfect app for you.',
			img_href: '/user3.webp'
		}
	]

	return (
		<div className='pt-2 w-full max-w-screen'>
			<section id='testimonials' aria-label='What our customers are saying' className=' py-4 sm:py-10'>
				<div className='mx-auto max-w-7xl px-0 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl text-center'>
						<h2 className='text-2xl font-bold tracking-tight text-erieblack dark:text-ghostwhite sm:text-5xl'>What our users say</h2>
					</div>
					<ul role='list' className='mt-10 px-4 pb-10 grid gap-6 md:grid md:gap-8 md:mt-10 md:max-w-none md:grid-cols-2 lg:grid-cols-3 '>
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
