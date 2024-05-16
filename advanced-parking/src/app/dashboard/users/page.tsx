'use client'
import { IUser } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
	const rute = process.env.NEXT_PUBLIC_URL
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
				<ul className='flex flex-row font-bold gap-4 pl-2'>
					<li className='w-40'>User Name </li>
					<li> Role</li>
					<li>email </li>
				</ul>
				<ul>
					{allUsers?.map((user) => (
						<Link key={user.id} href={`/dashboard/users/${user.id}`} className='flex flex-row gap-4 border border-1 p-2 hover:bg-slate-200'>
							<li className='w-40'>{user.name}</li>
							<li>{user.role}</li>
							<li>{user.email}</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Page
