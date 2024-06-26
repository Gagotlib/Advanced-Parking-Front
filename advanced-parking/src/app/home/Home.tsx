'use client'

import React, { useEffect } from 'react'
import HomeCard from '../components/cards/HomeCard'
import { homeCardProps } from '../utils/homeCardProps'
import Reviews from '../components/reviews/Reviews'
import Chatbot from '../components/chatBot/ChatBot'

export const Home = () => {
	useEffect(() => {
		localStorage.removeItem('pathname')
	}, [])

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col py-7 m-0 items-center justify-start'>
				<div className='rounded-lg flex flex-col w-full gap-4 items-center justify-start'>
					{homeCardProps.map((cardProps) => (
						<HomeCard key={cardProps.text} cardProps={cardProps} />
					))}
				</div>
				<Reviews />
				<div className="position: fixed; bottom: 20px; right: 20px; z-index: 50;">
					<Chatbot />
				</div>
			</div>
		</div>
	)
}

export default Home
