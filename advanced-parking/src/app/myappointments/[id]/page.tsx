import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
	return (
		<div className='flex flex-col min-h-screen pt-24'>
			<h1>appointments Detail</h1>
			<h1>{params.id}</h1>
		</div>
	)
}

export default page
