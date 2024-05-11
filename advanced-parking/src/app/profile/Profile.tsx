'use client'

import React, { useEffect, useState } from 'react'
import BookingsUser from '../components/bookings/BookingsUser'
import Avatar from 'react-avatar'

const Profile = () => {

	const usernull = {
		name: '',
		email: '',
		phone: '',
		role: ''
	}

	const [user, setUser] = useState(usernull)

	useEffect(() => {
		const userString = localStorage.getItem('user')
		const logedUser = userString ? JSON.parse(userString) : null
		setUser(logedUser)
	}, [])


	// Se supone que esta es para que con un nombre compouesto solo saque la primera letra de cada palabra pero no me funciona
	// const getInitials = (name: string) => {
	// 	const names = name.split(' '); // Dividir el nombre en palabras
	// 	let initials = ''; // Inicializar las iniciales
	// 	if (names.length > 0) {
	// 		initials += names[0].charAt(0); // Agregar la primera letra de la primera palabra
	// 		if (names.length > 1) {
	// 			initials += names[names.length - 1].charAt(0); // Agregar la primera letra de la última palabra si hay más de una palabra
	// 		}
	// 	}
	// 	return initials.toUpperCase(); // Devolver las iniciales en mayúsculas
	// };

	// const userString = localStorage.getItem('user')
	// const user = userString ? JSON.parse(userString) : null

	return (
		<div className="">
			<main className="h-3/4 w-full flex flex-col pt-24 gap-4">
				<div className="p-2 md:p-4">
					<h2 className="pl-6 text-5xl font-bold sm:text-5xl">
						{user?.name}
					</h2>
					<div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
						<div className="flex mt-8 gap-5 sm:gap-10">
							<div className="flex flex-col gap-3 items-center space-y-5 sm:space-y-0">
								<Avatar
									name={user.name}
									size="150"
									round
									color="#1C1C1C"
									maxInitials={2}
								/>
								<div className="flex flex-col space-y-5 sm:ml-2">
									<button type="button"
										className="py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50">
										Change picture
									</button>
									<button type="button"
										className="py-2 px-2 text-base font-medium text-yaleblue focus:outline-none bg-white rounded-lg border border-silver hover:bg-yaleblue/90 hover:text-ghostwhite focus:z-10 focus:ring-2 focus:ring-yaleblue/50">
										Delete picture
									</button>
								</div>
							</div>
							<div className="items-center mt-8 sm:mt-14 text-erieblack">
								<div className="mb-2 sm:mb-6">
									<label htmlFor="email"
										className="block mb-2 text-sm font-bold text-yaleblue">Your
										email</label>
									{user?.email}
								</div>
								<div className="mb-2 sm:mb-6">
									<label htmlFor="email"
										className="block mb-2 text-sm font-bold text-yaleblue">Your Phone</label>
									{user?.phone}
								</div>
								<div className="mb-2 sm:mb-6">
									<label htmlFor="email"
										className="block mb-2 text-sm font-bold text-yaleblue">Suscription</label>
									Platinum || Gold || Standard
								</div>
							</div>
						</div>
						<BookingsUser />
					</div>
				</div>
			</main>
		</div>
	)
}


export default Profile
