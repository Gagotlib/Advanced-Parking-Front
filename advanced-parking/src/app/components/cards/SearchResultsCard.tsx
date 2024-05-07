import React from 'react'

interface IcardProps {
	name: string
	address: string
	availableSlots: number
}

const SearchResultsCard = ({ cardProps }: { cardProps: IcardProps }) => {
	return (
		<div className='border-2 rounded-lg h-auto flex flex-col'>
			<p className='font-bold'>{cardProps.name}</p>
			<p>Direccion: {cardProps.address}</p>
			{cardProps.availableSlots < 5 ? <p className='text-red-500'>Espacios libres: {cardProps.availableSlots}</p> : <p className='text-green-500'>Espacios libres: {cardProps.availableSlots}</p>}
			{cardProps.availableSlots === 0 && <p className='text-red-500'>Estacionamiento lleno!</p>}
		</div>
	)
}

export default SearchResultsCard
