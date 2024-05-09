import React from 'react'
import Link from 'next/link'
import NavLinks from '@/app/components/sidenav/NavLinks'

const Sidenav = () => {
	return (
		<div className='flex h-full flex-col px-3 md:px-2'>
			<div className='flex flex-row justify-between  md:flex-col pt-24'>
				<NavLinks />
			</div>
		</div>
	)
}

export default Sidenav
