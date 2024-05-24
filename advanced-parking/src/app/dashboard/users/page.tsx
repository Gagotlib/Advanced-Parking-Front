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
			<h1 className='text-2xl sm:text-5xl font-bold'>Users Info</h1>
			<div className='relative flex flex-col'>
				<Suspense fallback={<p>Loading...</p>}>
					<table className='sm:max-w-full min-w-full table-auto w-full h-full border-collapse'>
						<thead>
							<tr>
								<th className='border p-2 text-left'>Role</th>
								<th className='border p-2 text-left'>Name </th>
								<th className='border p-2 text-left'>Email </th>
							</tr>
						</thead>
						<tbody>
							{allUsers ? (
								allUsers.map((user) => (
									<tr key={user.id} className='hover:bg-silver/20'>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>
												{user.role}
											</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>
												{user.name}
											</Link>
										</td>
										<td className='border p-2'>
											<Link href={`/dashboard/users/${user.id}`}>
												{user.email}
											</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} className='border p-2 text-center'>Loading...</td>
								</tr>
							)}
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	)
}

export default Page
