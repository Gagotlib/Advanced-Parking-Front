'use client'

import { ILogedUser, IParking } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextProps {
	token: string | null
	setToken: (token: string | null) => void
	user: ILogedUser | null
	setUser: (user: ILogedUser | null) => void
	allParkings: IParking[] | null
	setAllParkings: (allParking: IParking[] | null) => void
}
const AuthContext = createContext<AuthContextProps>({
	token: null,
	setToken: () => { },
	user: null,
	setUser: () => { },
	allParkings: null,
	setAllParkings: () => { }
})
interface AuthProviderProps {
	children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null)
	const [user, setUser] = useState<ILogedUser | null>(null)
	const [allParkings, setAllParkings] = useState<IParking[] | null>(null)
	useEffect(() => {
		const tokenFromCookie = localStorage.getItem('authToken')
		const userFromCookie = localStorage.getItem('user')
		const user = userFromCookie ? JSON.parse(userFromCookie) : null
		// const allParkingsFromCookies = localStorage.getItem('allParkings')
		// const allParkings = allParkingsFromCookies ? JSON.parse(allParkingsFromCookies) : null

		setUser(user)
		// setAllParkings(allParkings)
		// const parkingsFromCookies = localStorage.getItem('allParkings')
		// setAllParkings(parkingsFromCookies)
		if (tokenFromCookie) {
			setToken(tokenFromCookie)
		}
	}, [])
	return <AuthContext.Provider value={{ token, setToken, user, setUser, allParkings, setAllParkings }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)

