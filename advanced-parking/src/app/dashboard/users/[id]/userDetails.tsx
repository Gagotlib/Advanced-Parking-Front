import React from 'react'

const userDetails = ({ params }: { params: { slug: string } }) => {
	//me traigo del back los datos de ese user segun id
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
	const foundUser = allUsers.find((user) => user.id === Number(params.slug))

	return (
		<div>
			<h1> Detalles de usuario</h1>
		</div>
	)
}

export default userDetails
