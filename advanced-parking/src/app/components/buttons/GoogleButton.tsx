'use client'

import { useAuth } from '@/app/context/AuthContext'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const GoogleButton = () => {
	const rute = process.env.BACK_API_URL
	const { data: session } = useSession()
	const router = useRouter()
	const { user, setUser } = useAuth()
	const { token, setToken } = useAuth()

	const handleGoogleLogin = async () => {
		const result = await signIn('google', { redirect: true }) // Evita que signIn() realice la redirección por defecto
		if (result?.error) {
			// Manejar errores de inicio de sesión si es necesario
			console.error('Error al iniciar sesión:', result.error)
		} else {
			const newUserSession = session?.user
			if (!newUserSession) {
				console.log('ERRRRORRRRRRR')
			}
			axios
				.post(`${rute}/auth/signup-auth0`, newUserSession)
				.then((response) => response.data)
				.then((data) => {
					setUser(data.userData)
					setToken(data.token)
					localStorage.setItem('authToken', data.token)
					localStorage.setItem('user', JSON.stringify(data.userData))
					// setShowToast(true))
				})
				.catch((error) => console.error('Error al iniciar sesión:', error))
			// La autenticación fue exitosa, ahora podemos redirigir al usuario
		}
	}
	// console.log('consologeado desde el botton, Nombre:', session?.user?.name)

	return (
		<button
			type='button'
			className='text-ghostwhite bg-yaleblue hover:bg-yaleblue/90 focus:ring-4 focus:outline-none focus:ring-yaleblue/50 font-medium rounded-lg text-md sm:text-xl px-5 py-2.5 text-center inline-flex items-center me-2 mb-2'
			onClick={handleGoogleLogin}
		>
			<svg className='w-4 h-4 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 19'>
				<path
					fillRule='evenodd'
					d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
					clipRule='evenodd'
				/>
			</svg>
			Sign in with Google
		</button>
	)
}
