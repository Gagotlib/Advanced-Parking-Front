import Link from 'next/link'
import React from 'react'

interface IcardProps {
	name: string
	address: string
	availableSlots: number
	barrio: string
}

const SearchResultsCard = ({ cardProps }: { cardProps: IcardProps }) => {
	return (
		<Link href={`/ourparkings/${cardProps.name}`}>
			<div className='border-2 rounded-lg h-auto flex flex-col shadow-xl'>
				<p className='font-bold'>{cardProps.name}</p>
				<p>Direccion: {cardProps.address}</p>
				<p>Barrio: {cardProps.barrio}</p>
				{cardProps.availableSlots < 5 ? <p className='text-red-500'>Espacios libres: {cardProps.availableSlots}</p> : <p className='text-green-500'>Espacios libres: {cardProps.availableSlots}</p>}
				{cardProps.availableSlots === 0 && <p className='text-red-500'>Estacionamiento lleno!</p>}
			</div>
		</Link>
	)
}

export default SearchResultsCard
