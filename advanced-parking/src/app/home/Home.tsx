import React from 'react'
import HomeCard from '../components/cards/HomeCard'
import { homeCardProps } from '../utils/homeCardProps'

export const Home = () => {
	return (
		<div className='flex flex-col min-h-screen '>
			{/* borrar este navbar */}
			<div className='h-16 bg-duck-yellow w-full'>ACA va estar el Navbar</div>
			<div className=' flex flex-col min-h-screen py-4 m-0 gap-4 items-center justify-start'>
				{homeCardProps.map((cardProps) => (
					<HomeCard key={cardProps.text} cardProps={cardProps} />
				))}
			</div>

			<div className='text-md sm:text-md text-center  '>
				<p>Advanced Parking &copy; 2024. All Rights Reserved.</p>
			</div>
		</div>
	)
}

export default Home
