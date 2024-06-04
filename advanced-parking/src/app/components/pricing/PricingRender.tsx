import React, { useState } from 'react'

interface PricingRenderProps {
	duration: number
	setFormData: React.Dispatch<React.SetStateAction<any>>
}

function PricingRender({ duration, setFormData }: PricingRenderProps) {
	const [selectedHour, setSelectedHour] = useState<number | null>(localStorage.getItem("duration") ? parseInt(localStorage.getItem("duration")!) : null)
	const durations = Array.from({ length: 10 }, (_, index) => index + 1)
	const prices = durations.map((hour: any) => hour * 3.55)

	const handleSelect = (hour: number) => {
		setSelectedHour(hour)
		setFormData((prevFormData: any) => ({
			...prevFormData,
			duration: hour.toString() // Actualiza duration como string
		}))
		localStorage.setItem('duration', hour.toString())
	}

	return (
		<div className='w-full overflow-x-scroll scroll  whitespace-nowrap scroll-smooth focus:scroll-auto'>
			<div className='flex p-1 gap-2 text-xs'>
				{durations.map((hour: any, index: any) => (
					<div key={index}>
						<div className='flex flex-col p-2 items-center border border-silver/80 shadow-sm shadow-erieblack/80 rounded-lg hover:scale-105 '>
							<p className='font-bold'>
								{hour} <span className='font-bold'>hrs</span>
							</p>
							<p className='font-light'>{prices[index].toFixed(2)} $</p>
							<button
								type='button'
								className={`rounded-xl border border-silver w-3.5 h-3.5 focus:z-10 focus:outline-none ${selectedHour === hour ? 'bg-duck-yellow/80' : 'bg-ghostwhite'}`}
								onClick={() => handleSelect(hour)}
							></button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default PricingRender
