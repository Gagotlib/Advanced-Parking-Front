import React from 'react'

type Props = {}

export const Loading = () => {
	return (
		<div className='animate-pulse h-full min-w-full'>
			<h1 className='h-10 bg-gray-200 rounded-xl'></h1>
			<form className='m-4 border-2 rounded-xl p-4 w-10/20'>
				<div className=''>
					<div className='h-7 bg-gray-200 rounded'></div>
					<div className='w-3/4 h-8 bg-gray-200 rounded mt-2'></div>
				</div>
				<div className='mt-4'>
					<div className='h-7 bg-gray-200 rounded'></div>
					<div className='w-3/4 h-20 bg-gray-200 rounded mt-2'></div>
				</div>
				<div className='mt-4'>
					<div className='h-7 bg-gray-200 rounded'></div>
					<div className='w-3/4 h-8 bg-gray-200 rounded mt-2'></div>
				</div>
				<div className='h-10 bg-gray-200 rounded mt-4'></div>
			</form>
		</div>
	)
}

export default Loading
