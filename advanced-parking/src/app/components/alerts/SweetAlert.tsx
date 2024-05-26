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
