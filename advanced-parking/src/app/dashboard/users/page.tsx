'use client'
import { IUser } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allUsers, setAllsers] = useState<IUser[] | null>(null)
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		axios
			.get(`${rute}/user`, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
			.then(({ data }) => {
				setAllsers(data)
			})
	}, [])

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<h1>These are all the Users</h1>
			<div className='relative flex flex-col'>
				<div className='flex flex-row font-bold gap-4 pl-2'>
					<p className='w-32'>User Name </p>
					<p className='w-14'>Role</p>
					<p>Email </p>
				</div>
				<div>
					<Suspense fallback={<p>Loading...</p>}>
						{allUsers ? (
							allUsers.map((user) => (
								<Link key={user.id} href={`/dashboard/users/${user.id}`} className='flex flex-row gap-4 border border-1 p-2 hover:bg-slate-200'>
									<p className='w-32 min-w-32'>{user.name}</p>
									<p className='w-14'>{user.role}</p>
									<p className='text-clip overflow-hidden'>{user.email}</p>
								</Link>
							))
						) : (
							<p>Loading...</p>
						)}
					</Suspense>
				</div>
			</div>
		</div>
	)
}

export default Page
