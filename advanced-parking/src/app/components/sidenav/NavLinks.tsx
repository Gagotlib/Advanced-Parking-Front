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
							'flex h-[48px] w-auto md:w-auto items-center flex-wrap justify-between md:my-1 rounded-md bg-gray-50 p-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-col md:justify-start md:p-3 md:px-3 ',
							{
								'bg-sky-100 text-blue-600': pathname === link.href
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
