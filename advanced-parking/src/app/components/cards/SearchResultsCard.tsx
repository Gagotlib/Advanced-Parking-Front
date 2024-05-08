import Link from 'next/link'
import React from 'react'

interface IcardProps {
	name: string
	location: string
	slots_stock: number
}

const SearchResultsCard = ({ cardProps }: { cardProps: IcardProps }) => {
	const color = cardProps.slots_stock < 5 ? 'text-red-500' : 'text-green-500'

	return (
		<Link href={`/ourparkings/${cardProps.name}`}>
			<div className='border-2 rounded-lg h-auto flex flex-col shadow-xl'>
				<p className='font-bold'>{cardProps.name}</p>
				<p>Dirección: {cardProps.location}</p>

				<p className={`${color}`}>Espacios libres en este momento: {cardProps.slots_stock}</p>
				{cardProps.slots_stock === 0 && <p className='text-red-500'>Estacionamiento lleno!</p>}
			</div>
		</Link>
	)
}

export default SearchResultsCard
