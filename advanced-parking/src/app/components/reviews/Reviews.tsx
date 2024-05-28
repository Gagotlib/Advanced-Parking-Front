'use client'
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import axios from 'axios'

export interface IReview {
	id: string
	message: string
	rating: number
	user: {
		id: string
		name: string
		email: string
		image: string
	}
}

function Reviews() {
	const [reviews, setReviews] = useState<IReview[] | []>([])
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL

	useEffect(() => {
		axios.get(`${rute}/reviews`).then(({ data }) => {
			console.log(data)
			setReviews(data)
		})
	}, [])

	return (
		<div className='pt-2 w-full max-w-screen'>
			<section id='testimonials' aria-label='What our customers are saying' className=' py-4 sm:py-10'>
				<div className='mx-auto max-w-7xl px-0 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl text-center'>
						<h2 className='text-2xl font-bold tracking-tight text-erieblack dark:text-ghostwhite sm:text-5xl'>What our users say</h2>
					</div>
					<ul role='list' className='mt-10 px-4 pb-10 grid gap-6 md:grid md:gap-8 md:mt-10 md:max-w-none md:grid-cols-2 lg:grid-cols-3 '>
						{reviews.length > 0 ? reviews.map((review) => <ReviewCard key={review.id} userName={review.user.name} userImage={review.user.image} message={review.message} />) : null}
					</ul>
				</div>
			</section>
		</div>
	)
}

export default Reviews
