import { IParking, IUser } from '@/types'
import axios from 'axios'
import { IBooking } from '../success/[id]/BookingDetail'

export const fetchAllParkings = async () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const token = localStorage.getItem('authToken')
	try {
		const response = await axios.get(`${rute}/parking-lot`, {
			headers: {
				Authorization: `Bearer: ${token}`
			}
		})
		const parkings: IParking[] = response.data
		return parkings
	} catch (error) {
		console.log(error)
	}
}
export const fetchAllUsers = async () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const token = localStorage.getItem('authToken')
	try {
		const response = await axios.get(`${rute}/user`, {
			headers: {
				Authorization: `Bearer: ${token}`
			}
		})
		const users: IUser[] = response.data
		return users
	} catch (error) {
		console.log(error)
	}
}
export const fetchAllAppointments = async () => {
	const rute = process.env.NEXT_PUBLIC_BACK_API_URL
	const token = localStorage.getItem('authToken')
	try {
		const response = await axios.get(`${rute}/appointments`, {
			headers: {
				Authorization: `Bearer: ${token}`
			}
		})
		const appointments: IBooking[] = response.data
		return appointments
	} catch (error) {
		console.log(error)
	}
}
