import Image from 'next/image'
import React from 'react'
import { ReserveButton } from '../buttons/Buttons'
import clsx from 'clsx'

function Pricing() {

  const hours = Array.from({ length: 10 }, (_, index) => index + 1);
  const prices = hours.map(hour => hour * 3.55);

  return (
    <div className='pt-20 pb-8'>
      <Image
        src='/rates.webp'
        className='w-lvw h-80 object-cover'
        alt='Image Pricing Page'
        priority
        width={500}
        height={500}
      />
      <div className='pt-8 flex justify-center'>
        <table className="table-auto text-center text-erieblack border-collapse w-full h-full mx-10">
          <thead className="text-xs text-erieblack font-bold uppercase md:text-md bg-yaleblue/50">
            <tr>
              <th scope="col" className="px-2 py-4 border-b border-b-erieblack/90 ">Calculate your rate</th>
              <th scope="col" className="px-2 py-4 border-b border-b-erieblack/90 ">Prices</th>
            </tr>
          </thead>
          <tbody className='border-b border-erieblack'>
            {hours.map((hour, index) => (
              <tr
                key={index}
                className={clsx(
                  "border-b border-erieblack",
                  { 'bg-silver/50': hour % 2 === 0 }
                )}
              >
                <td scope="row"
                  className="px-6 py-2 font-medium text-erieblack whitespace-nowrap border-collapse">
                  <p className='font-bold'>
                    {hour} <span className='font-bold'>hours</span>
                  </p>
                </td>
                <td className="px-6 py-2 ">
                  <p className='font-light  '>
                    {prices[index].toFixed(2)} <span >$</span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center text-md sm:text-lg pt-4 font-light">
        <p> From the 10th hour to 24 hours, <span className='font-bold'>€35.50 </span> is charged.</p>
      </div>
      <div className='flex flex-col items-center pt-10 gap-3'>
        <h3 className='flex font-semibold text-xl sm:text-5xl'> Reserve your place </h3>
        <p className='leading-6 text-center text-sm sm:text-lg'>Don´t be left without parking, look for your favorite parking establishment and reserve.</p>
        <ReserveButton />
      </div>
    </div >
  )
}

export default Pricing