'use client'

import Link from 'next/link'
import Avatar from 'react-avatar'

import { useAuth } from '@/app/context/AuthContext'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

function Navprofile() {
	const router = useRouter()
	const [menuOpen, setMenuOpen] = useState(false)
	const { token, setToken } = useAuth()
	const { user, setUser } = useAuth()

	const { data: session } = useSession()
	console.log('sesion guardada por google, consologeado desde navbar', session?.user)
	console.log('user logeado por login, consologeado desde Navprofile', user)

	useEffect(() => {
		// console.log('renderizado de navbar', user)
		// console.log('renderizado', token)
	}, [user, token])

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}
	const handleLogOut = async () => {
		console.log('TE DESLOGEASTE')
		// que borre todos los datos del user

		localStorage.removeItem('authToken')
		localStorage.removeItem('user')
		setToken(null)
		setUser(null)
		signOut()

		router.push('/')
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

				{user ? (
					(user.role === 'user',
					'admin' && (
						<Avatar
							// name={user.name}
							size='40'
							round
							// color="#063971"
							src={user.image}
							// maxInitials={2}
						/>
					))
				) : (
					<Avatar size='40' round src='/profile-picture-blank.webp' />
				)}
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
								<Link href='/dashboard' onClick={toggleMenu} className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
									Dashboard
								</Link>
							</li>
						)}
						{user.role === 'user' && (
							<>
								<li>
									<Link href='#' onClick={toggleMenu} className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
										My Bookings
									</Link>
								</li>
								<li>
									<Link href='/profile' onClick={toggleMenu} className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
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
							<Link onClick={toggleMenu} href='/login' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
								Sign in
							</Link>
						</li>
						<li>
							<Link onClick={toggleMenu} href='/register' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
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
