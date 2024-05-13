import Link from 'next/link'
import React from 'react'

interface IcardProps {
	id:string
	name: string
	location: string
	slots_stock: number
}

const SearchResultsCard = ({ cardProps }: { cardProps: IcardProps }) => {
	const color = cardProps.slots_stock < 5 ? 'text-red-500' : 'text-green-500'

	return (
		<Link href={`/ourparkings/${cardProps.id}`}>
			<div className=' border-2 rounded-3xl sm:h-60 flex flex-col shadow-x text-center p-2 items-center justify-around shadow-lg'>
				<p className='font-bold text-2xl'> {cardProps.name}</p>
				<p>
					Address: <span className='italic'>{cardProps.location}</span>
				</p>
				<p className={`${color}`}>Available slots:{cardProps.slots_stock}</p>
				{cardProps.slots_stock === 0 && <p className='text-red-500 font-medium'>Parking Lot Full</p>}
			</div>
		</Link>
	)
}

export default SearchResultsCard
