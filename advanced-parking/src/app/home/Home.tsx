'use client'

import React, { useEffect } from 'react'
import HomeCard from '../components/cards/HomeCard'
import { homeCardProps } from '../utils/homeCardProps'
import Reviews from '../components/reviews/Reviews'

export const Home = () => {
	useEffect(() => {
		localStorage.removeItem('pathname')
	},[])

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col py-4 m-0 items-center justify-start'>
				<div className='rounded-lg flex flex-col w-full gap-4 items-center justify-start'>
					{homeCardProps.map((cardProps) => (
						<HomeCard key={cardProps.text} cardProps={cardProps} />
					))}
				</div>
				<Reviews />
			</div>
		</div>
	)
}

export default Home
