import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

const SlotSelection = ({ setSlotShow, selectedSlot, setSelectedSlot, setShowOverlay }: any) => {
	const handleSelect = (e: any) => {
		const selected = e.target.innerHTML
		console.log('selected', selected)
		setSelectedSlot(selected)
	}
	console.log('selected slot', selectedSlot)
	const slots = Array.from({ length: 10 }, (_, index) => index + 1)
	const floor1 = slots.slice(0, 5)
	const floor2 = slots.slice(5, 10)

	return (
		<div className='absolute lg:left-[32rem] lg:w-1/4 lg:top-[16rem] z-5 h-auto w-3/4 top-[31.5rem] bg-ghostwhite border border-black rounded-xl shadow-lg shadow-silver/80'>
			<div className='sm:mx-4 mr-2'>
				<div className='grid h-3/4 grid-cols-3 mt-4 mx-2'>
					<div className='flex flex-col gap-1'>
						{floor1.map((slot, index) => (
							<div
								key={index + 1}
								className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed border-r-0 rounded-md border-erieblack bg-silver/50 hover:cursor-pointer ', {
									'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 1).toString()
								})}
								onClick={(e) => handleSelect(e)}
							>
								{slot}
							</div>
						))}
					</div>
					<div className='flex justify-center items-center'>
						<Image src='/upArrow.webp' alt='Up Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
						<Image src='/downArrow.webp' alt='Down Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
					</div>
					<div className='flex flex-col gap-1 '>
						{floor2.map((slot, index) => (
							<div
								key={index + 6}
								className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed rounded-md border-l-0 border-erieblack bg-silver/50 hover:cursor-pointer', {
									'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 6).toString()
								})}
								onClick={(e) => handleSelect(e)}
							>
								{slot}
							</div>
						))}
					</div>
				</div>
				<p>Enter / Exit</p>
				<hr className='border border-erieblack/80 border-1 mb-4' />
				<button
					type='button'
					className='mb-2 py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
					onClick={() => {
						setSlotShow(false)
						setShowOverlay(false)
					}}
				>
					{' '}
					Select Slot
				</button>
			</div>
		</div>
	)
}

export default SlotSelection
