'use client'
import React, { useState } from 'react'
import { ParkingsMocks } from '../utils/parkingsMock'
import SearchResultsCard from '../components/cards/SearchResultsCard'
import { BackToHomeButton } from '../components/buttons/Buttons'

export const Ourparkings = () => {
	const [searchValue, setSearchValue] = useState('')

	// Filtrar los resultados basados en el valor de búsqueda (nombre o dirección)
	const filteredResults = ParkingsMocks.filter((parking) => {
		return parking.location.toLowerCase().includes(searchValue.toLowerCase()) || parking.name.toLowerCase().includes(searchValue.toLowerCase())
	})
	//useeffect para pedir los parkings

	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<div className=' flex flex-col min-h-screen py-4 m-0 gap-4 items-center justify-start'>
				<form className='w-10/12'>
					<label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
						Search
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none'
								viewBox='0 0 20 20'>
								<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
							</svg>
						</div>
						<input
							type='search'
							id='search'
							className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
							placeholder='Search by address or parking name'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							required
						/>
						{/* <button type='submit' className='text-black absolute end-2.5 bottom-2.5 bg-duck-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '>
							Search
						</button> */}
					</div>
				</form>
				<div className='rounded-lg flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-10/12 gap-4'>
					{filteredResults.map((result) => (
						<SearchResultsCard key={result.name} cardProps={result} />
					))}
				</div>
				<BackToHomeButton />
			</div>
		</div>
	)
}

export default Ourparkings
