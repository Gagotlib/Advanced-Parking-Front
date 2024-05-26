import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IParkingSlot {
	id: string
	slot_number: number
	slot_status: 'available' | 'unavailable' | 'reserved'
}

const SlotSelection = ({ setSlotShow, selectedSlot, setSelectedSlot, setShowOverlay, parking, date, time, duration }: any) => {
	// const slots: IParkingSlot[] = parking.slot.sort((a: IParkingSlot, b: IParkingSlot) => a.slot_number - b.slot_number)
	// console.log('slots', slots)
	const [slots, setSlots] = useState<any | null>(null)

	useEffect(() => {
		const rute = process.env.NEXT_PUBLIC_BACK_API_URL
		axios.get(`${rute}/slot?date=${date}&time=${time}&duration=${duration}&parking_lot_id=${parking.id}`).then(({ data }) => setSlots(data))
	}, [slots])

	const floor1 = slots?.sort((a: IParkingSlot, b: IParkingSlot) => a.slot_number - b.slot_number).slice(0, 10)
	const floor2 = slots?.sort((a: IParkingSlot, b: IParkingSlot) => a.slot_number - b.slot_number).slice(10, 20)

	const handleSelect = (e: any) => {
		const selected = e.target.innerHTML
		const selectedSlot = slots[selected - 1]
		if (selectedSlot.slot_status !== 'available') return
		setSelectedSlot(selected)
	}
	// console.log('selected slot', selectedSlot)



	return (
		<div className='absolute lg:left-[32rem] lg:w-[345px] lg:top-[8rem] z-5 h-auto w-3/4 top-[38rem] bg-ghostwhite border dark:bg-gray-500 border-black rounded-xl shadow-lg shadow-silver/80'>
			<div className='sm:mx-4 mr-2'>
				<div className='flex justify-end'>
					<button
						className="text-silver hover:text-erieblack"
						onClick={() => {
							setSlotShow(false)
							setShowOverlay(false)
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>
				<div className='grid h-3/4 grid-cols-3 mt-4 mx-2'>
					<div className='flex flex-col gap-1'>
						{slots ? (
							floor1?.map((slot: any, index: any) => (
								<div
									key={index + 1}
									className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed border-r-0 rounded-md border-erieblack bg-green-500 hover:cursor-pointer ', {
										'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 1).toString(),
										'bg-red-400  hover:pointer-events-none': slot.slot_status !== 'available'
									})}
									onClick={(e) => handleSelect(e)}
								>
									{slot.slot_number}
								</div>
							))
						) : (
							<p>LOADING</p>
						)}
					</div>
					<div className='flex justify-center items-center'>
						<Image src='/upArrow.webp' alt='Up Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
						<Image src='/downArrow.webp' alt='Down Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
					</div>
					<div className='flex flex-col gap-1 '>
						{slots ? (
							floor2.map((slot: any, index: any) => (
								<div
									key={index + 11}
									className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed rounded-md border-l-0 border-erieblack bg-green-500 hover:cursor-pointer', {
										'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 11).toString(),
										'bg-red-400 hover:pointer-events-none': slot.slot_status !== 'available'
									})}
									onClick={(e) => handleSelect(e)}
								>
									{slot.slot_number}
								</div>
							))
						) : (
							<p>LOADING</p>
						)}
					</div>
				</div>

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
	// 	<div className='absolute lg:left-[32rem] lg:w-1/4 lg:top-[16rem] z-5 h-auto w-3/4 top-[45rem] bg-ghostwhite border border-black rounded-xl shadow-lg shadow-silver/80'>
	// 		<div className='sm:mx-4 mr-2'>
	// 			<div className='grid h-3/4 grid-cols-3 mt-4 mx-2'>
	// 				<div className='flex flex-col gap-1'>
	// 					{floor1.map((slot, index) => (
	// 						<div
	// 							key={index + 1}
	// 							className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed border-r-0 rounded-md border-erieblack bg-silver/50 hover:cursor-pointer ', {
	// 								'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 1).toString()
	// 							})}
	// 							onClick={(e) => handleSelect(e)}
	// 						>
	// 							{slot.slot_number}
	// 						</div>
	// 					))}
	// 				</div>
	// 				<div className='flex justify-center items-center'>
	// 					<Image src='/upArrow.webp' alt='Up Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
	// 					<Image src='/downArrow.webp' alt='Down Arrow Webp' className='sm:h-[50px] sm:w-[50px]' width={30} height={30} priority />
	// 				</div>
	// 				<div className='flex flex-col gap-1 '>
	// 					{floor2.map((slot, index) => (
	// 						<div
	// 							key={index + 6}
	// 							className={clsx('max-w-[100px] min-w-[75px] p-2 border border-dashed rounded-md border-l-0 border-erieblack bg-silver/50 hover:cursor-pointer', {
	// 								'bg-selectSlot bg-no-repeat bg-cover text-transparent': selectedSlot === (index + 6).toString()
	// 							})}
	// 							onClick={(e) => handleSelect(e)}
	// 						>
	// 							{slot.slot_number}
	// 						</div>
	// 					))}
	// 				</div>
	// 			</div>
	// 			<p>Enter / Exit</p>
	// 			<hr className='border border-erieblack/80 border-1 mb-4' />
	// 			<button
	// 				type='button'
	// 				className='mb-2 py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
	// 				onClick={() => {
	// 					setSlotShow(false)
	// 					setShowOverlay(false)
	// 				}}
	// 			>
	// 				{' '}
	// 				Select Slot
	// 			</button>
	// 		</div>
	// 	</div>
	// )
}

export default SlotSelection
