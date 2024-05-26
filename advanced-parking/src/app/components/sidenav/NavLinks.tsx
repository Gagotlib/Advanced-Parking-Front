'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

//!modificar
const links = [
	{ name: 'Home', href: '/dashboard' },
	{ name: 'Users', href: '/dashboard/users' },
	{ name: 'Appointments', href: '/dashboard/appointments' },
	{ name: 'Parking Lots', href: '/dashboard/parkinglots' }
]

export default function NavLinks() {
	const pathname = usePathname()
	// console.log(pathname);

	return (
		<>
			{links.map((link) => {
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							'flex h-[60px] md:h-auto w-full mr-2 md:w-auto items-center flex-wrap justify-between md:my-1 rounded-md dark:bg-gray-500 bg-gray-50 p-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-col md:justify-start py-1 md:p-3 md:px-3 ',
							{
								'bg-sky-100 text-blue-300': pathname === link.href
							}
						)}
					>
						<p className='block md:block'>{link.name}</p>
					</Link>
				)
			})}
		</>
	)
}
