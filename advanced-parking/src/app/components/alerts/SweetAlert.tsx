import React from 'react'
import Swal from 'sweetalert2'

export const showSweetAlert = async (onConfirm: any) => {
	const result = await Swal.fire({
		title: 'Are you sure?',
		text: 'Do you really want to delete the profile photo?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Deleted!',
			text: 'Your photo has been deleted.',
			icon: 'success'
		})
	}
}
export const showSweetAlertAppointment = async (onConfirm: any) => {
	const result = await Swal.fire({
		title: 'Are you sure?',
		text: 'Do you really want to delete the appointment?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Deleted!',
			text: 'Your appointment has been deleted.',
			icon: 'success'
		})
	}
}
export const showSweetAlertChangeInfo = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want to save these changes?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Changes saved',
			icon: 'success'
		})
	}
}
export const showSweetAlertDeleteAccountUser = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want to delete your account?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Account deleted',
			icon: 'success'
		})
	}
}
export const showSweetAlertDeleteAccounAdmin = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want to delete this user account?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Account deleted',
			icon: 'success'
		})
	}
}
export const showSweetAlertDeleteParking = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want to delete this Parking?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Parking deleted',
			icon: 'success'
		})
	}
}
export const showSweetAlertChangePassword = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want to change your password?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Password changed',
			icon: 'success'
		})
	}
}

export const showSweetAlertCreatedAppointment = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want create this reserve?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Reservation created',
			icon: 'success'
		})
	}
}

export const showSweetAlertCreatedParkinkLot = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want create this parkink lot?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Creating Parking lot',
			text: 'This operation may take a few minutes.',
			icon: 'success'
		})
	}
}
export const showSweetAlertCreatedParkingSlot = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want create one slot for this Parking lot?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'Parking slot created',
			icon: 'success'
		})
	}
}
export const showSweetAlertCreatedUser = async (onConfirm: any) => {
	const result = await Swal.fire({
		text: 'Do you really want create this User?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#063971',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, I want!'
	})

	if (result.isConfirmed) {
		onConfirm()
		Swal.fire({
			title: 'User created',
			icon: 'success'
		})
	}
}
