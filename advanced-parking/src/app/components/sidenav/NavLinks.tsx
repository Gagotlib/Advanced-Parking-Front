'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

//!modificar
const links = [
	{ name: 'Home', href: '/dashboard' },
	{ name: 'Users', href: '/dashboard/users' },
	{ name: 'Appointments', href: '/dashboard/appointments' }
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
							'flex h-[48px] items-center justify-center md:my-1 rounded-md bg-gray-50 p-10 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-col md:justify-start md:p-3 md:px-3 ',
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
