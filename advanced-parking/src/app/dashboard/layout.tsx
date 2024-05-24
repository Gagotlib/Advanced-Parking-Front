'use client'
import SideNav from '@/app/components/sidenav/Sidenav'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
	const { user, setUser } = useAuth()
	const router = useRouter()
	const [cont, setCont] = useState(0)
	useEffect(() => {
		// console.log(user)
		if (cont === 0 && !user) {
			setCont((prevcont) => prevcont + 1)
		} else if (cont !== 0 && (!user || user.role !== 'admin')) {
			router.push('/')
		}
	}, [cont])

	return user?.role !== 'admin' ? (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden pt-28'>
			<p className='font-base text-md'>You don´t have permission to access this page</p>
		</div>
	) : (
		<div className='flex minh-screen flex-col md:flex-row md:overflow-hidden pt-6'>
			<div className='w-full flex-none md:w-64'>
				<SideNav />
			</div>
			<div className='flex-grow p-2 pt-0 md:overflow-y-auto md:p-8'>{children}</div>
		</div>
	)
}
