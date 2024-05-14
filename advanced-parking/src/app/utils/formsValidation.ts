import { IErrors, IUser } from '@/types'

function validarEmail(email: string) {
	// Expresión regular para validar un correo electrónico
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return regex.test(email)
}

export const validateRegister = (userData: IUser) => {
	const errors: IErrors = {}

	if (userData.name.length <= 1) {
		errors.name = 'Your name is required and it must be at least 2 characters long'
	}
	if (userData.password.length < 5) {
		errors.password = 'Password must have at least 5 characters'
	}
	if (!validarEmail(userData.email)) {
		errors.email = 'Email address is not valid'
	}
	if (!userData.phone) {
		errors.phone = 'The phone number is required'
	}

	return errors
}

export const validateNewAppointment = (formData: any) => {
	const { date, time, description } = formData
	const errors = {}

	return errors
}
