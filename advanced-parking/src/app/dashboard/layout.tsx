'use client'
import SideNav from '@/app/components/sidenav/Sidenav'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
	const { user, setUser } = useAuth()
	const router = useRouter()
	useEffect(() => {
		if (user && user.role !== 'admin') {
			console.log('sacado por no ser admin')
			router.push('/')
		}
	}, [user])

	return user?.role !== 'admin' ? (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden pt-28'>
			<h1>You dont have permission to access this page</h1>
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
