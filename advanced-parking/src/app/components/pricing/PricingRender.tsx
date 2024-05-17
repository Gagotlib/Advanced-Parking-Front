import React from 'react'

function PricingRender() {

  const hours = Array.from({ length: 10 }, (_, index) => index + 1);
  const prices = hours.map(hour => hour * 3.55);

  return (
    <div className="w-[320px] overflow-x-scroll scroll whitespace-nowrap scroll-smooth ">
      <div className='flex p-1 gap-2 text-xs'>
        {hours.map((hour, index) => (
          <button
            type='button'
            key={index}
            className="flex flex-col p-2 items-center border border-silver/80 shadow-sm shadow-erieblack/80 rounded-lg hover:scale-105 focus:z-10 focus:ring-2 focus:ring-yaleblue/50 focus:outline-none"
          >
            <p className='font-bold'>{hour} <span className='font-bold'>hrs</span></p>
            <p className='font-light'>{prices[index].toFixed(2)} €</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PricingRender

