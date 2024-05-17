import React from 'react'
import clsx from 'clsx'

const SlotSelection = ({ setSlotShow, selectedSlot, setSelectedSlot }: any) => {
	const handleSelect = (e: any) => {
		const selected = e.target.innerHTML
		setSelectedSlot(selected)
		// console.log(e)
	}
	const slots = [...Array(10)]
	const slots2 = [...Array(10)]

	return (
		<div className='absolute lg:left-20 lg:w-1/2 lg:top-28 z-5 h-auto w-3/4 bg-ghostwhite border border-black rounded-xl'>
			<div className='grid h-3/4 grid-cols-3 mt-4 mx-2'>
				<div className='flex flex-col-reverse gap-1 '>
					{slots.map((slot, index) => (
						<div
							key={index + 1}
							className={clsx('p-2 border border-black bg-green-100 hover:cursor-pointer', { 'bg-green-500': selectedSlot === (index + 1).toString() })}
							onClick={(e) => handleSelect(e)}
						>
							{index + 1}
						</div>
					))}
				</div>
				<div className='flex flex-col justify-center'>⬆️⬇️</div>
				<div className='flex flex-col gap-1 '>
					{slots2.map((slot, index) => (
						<div
							key={index + 10}
							className={clsx('p-2 border border-black bg-green-100 hover:cursor-pointer', { 'bg-green-500': selectedSlot === (index + 11).toString() })}
							onClick={(e) => handleSelect(e)}
						>
							{index + 11}
						</div>
					))}
				</div>
			</div>
			<p>ENTRADA / SALIDA</p>
			<hr className='border border-black border-1 mb-4 ' />
			<button
				type='button'
				className='mb-2 py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
				onClick={() => setSlotShow(false)}
			>
				{' '}
				Select Slot
			</button>
		</div>
	)
}

export default SlotSelection
