import React from 'react'
import HomeCard from '../components/cards/HomeCard'
import { homeCardProps } from '../utils/homeCardProps'

export const Home = () => {
	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className='flex flex-col py-4 m-0 items-center justify-start'>
				<div className='rounded-lg flex flex-col w-full gap-4  items-center justify-start'>
					{homeCardProps.map((cardProps) => (
						<HomeCard key={cardProps.text} cardProps={cardProps} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
