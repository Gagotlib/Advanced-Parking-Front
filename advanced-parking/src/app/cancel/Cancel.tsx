import React from 'react'
import { ContactButton } from '../components/buttons/Buttons'

const Cancel = () => {
	return (
		<div className='flex flex-col items-center min-h-screen pt-24'>
			<div className=' flex flex-col items-center gap-2'>
				<h1>Appointment not approved </h1>
				<p>Payment could not be processed</p>
				<p>Please try again</p>
				<p>If the problem persists please contact us here</p>

				<ContactButton />
				<p>Thank you for using our service</p>

				<p>Advanced Parking Support Team</p>
			</div>
		</div>
	)
}

export default Cancel
