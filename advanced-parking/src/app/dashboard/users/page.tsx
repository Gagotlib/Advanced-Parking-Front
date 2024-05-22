'use client'
import { IUser } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const [allUsers, setAllsers] = useState<IUser[] | []>([])
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
			<h1>Esto es lo correspondiente a users</h1>
			<div className='relative flex flex-col'>
				<div className='flex flex-row font-bold gap-4 pl-2'>
					<p className='w-32'>User Name </p>
					<p className='w-14'>Role</p>
					<p>Email </p>
				</div>
				<Suspense fallback={<h1></h1>}>
					<div>
						{allUsers ? (
							allUsers.map((user) => (
								<Link key={user.id} href={`/dashboard/users/${user.id}`} className='flex flex-row gap-4 border border-1 p-2 hover:bg-slate-200'>
									<p className='w-32 min-w-32'>{user.name}</p>
									<p className='w-14'>{user.role}</p>
									<p className='text-clip overflow-hidden'>{user.email}</p>
								</Link>
							))
						) : (
							<p className='flex flex-col min-h-screen md:pt-6'>
								<h1>Loading...</h1>
							</p>
						)}
					</div>
				</Suspense>
			</div>
		</div>
	)
}

export default Page
