import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
	const user1 = {
		id: 1,
		name: 'Roberto',
		email: 'roberto@mail.com',
		phone: '123456789',
		role: 'user'
	}
	const user2 = {
		id: 2,
		name: 'Jorge',
		email: 'jorge@mail.com',
		phone: '123456789',
		role: 'user'
	}
	const admin = {
		id: 1111,
		name: 'administrador',
		email: 'admin@mail.com',
		phone: '123456789',
		role: 'admin'
	}
	const allUsers = [user1, user2, admin]

	return (
		<div className='flex flex-col min-h-screen md:pt-8'>
			<h1>Esto es lo correspondiente a users</h1>
			<div className='flex flex-col gap-7'>
				{allUsers.map((user) => (
					<div key={user.id}>
						<Link href={`/dashboard/users/${user.id}`}>
							<p className='font-bold'>{user.name}</p>
							<p>{user.role}</p>
							<p>{user.email}</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default page
