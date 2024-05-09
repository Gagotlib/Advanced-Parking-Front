'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'

function Navprofile() {
	const router = useRouter()
	const [menuOpen, setMenuOpen] = useState(false)
	//! hardcodeo de unos users para pruebas
	const user1 = {
		id: 1,
		name: 'roberto',
		email: 'roberto@mail.com',
		phone: '123456789',
		role: 'user'
	}
	const admin = {
		id: 1,
		name: 'admin',
		email: 'admin@mail.com',
		phone: '123456789',
		role: 'admin'
	}
	const user = admin

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}
	const handleLogOut = async () => {
		console.log('TE DESLOGEASTE')
		// que borre todos los datos del user

		// redirigir a home
		router.push('/home')
	}

	return (
		<div className='flex items-center md:order-2 relative'>
			<button
				type='button'
				onClick={toggleMenu}
				className='flex text-sm bg-erieblack rounded-full md:me-0 focus:ring-4 focus:ring-silver ml-2'
				id='dropdownInformationButton'
				aria-expanded={menuOpen ? 'true' : 'false'}
				data-dropdown-toggle='dropdownInformation'
				data-dropdown-placement='bottom'
			>
				<span className='sr-only'>Open user menu</span>
				<Image className='w-8 h-8 rounded-full' src='/advanced_parking.jpg' alt='user photo' width={300} height={300} />
			</button>

			<div className={`z-50 ${menuOpen ? '' : 'hidden'} my-4 text-base list-none bg-ghostwhite divide-y divide-silver rounded-lg shadow fixed top-12 right-0 md:right-10`} id='dropdownInformation'>
				{user && (
					<div className='px-4 py-3'>
						<span className='block text-sm text-erieblack'>{user.name}</span>
						<span className='block text-sm text-silver truncate'>{user.email}</span>
					</div>
				)}

				{user ? (
					<ul className='py-2' aria-labelledby='dropdownInformationButton'>
						{user.role === 'admin' && (
							<li>
								<Link href='/dashboard' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
									Dashboard
								</Link>
							</li>
						)}
						{user.role === 'user' && (
							<>
								<li>
									<Link href='#' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
										My Bookings
									</Link>
								</li>
								<li>
									<Link href='/profile' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
										My Profile
									</Link>
								</li>
							</>
						)}

						<li>
							<button type='button' className='text-start block px-4 py-2 text-sm text-erieblack hover:bg-silver w-full' onClick={handleLogOut}>
								Log Out
							</button>
						</li>
					</ul>
				) : (
					<ul className='py-2' aria-labelledby='dropdownInformationButton'>
						<li>
							<Link href='/login' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
								Sign in
							</Link>
						</li>
						<li>
							<Link href='/register' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
								Register
							</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}

export default Navprofile
