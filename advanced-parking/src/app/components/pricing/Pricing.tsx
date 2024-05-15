import Image from 'next/image'
import React from 'react'
import { ReserveButton } from '../buttons/Buttons'

function Pricing() {
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
      <div className='flex justify-center pt-10'>
        <table className="text-center text-erieblack table-fixed border-collapse border border-erieblack/90">
          <thead className="text-xs text-erieblack font-bold uppercase md:text-md bg-silver">
            <tr >
              <th scope="col" className="px-6 py-2 border border-erieblack/90">GENERAL RATE</th>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">PRICES</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-ghostwhite">
              <td scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                From 0 to 60 minutes
              </td>
              <td className="px-6 py-4 border border-erieblack/90">
                0,06 €/min
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                From 61 to 240 minutes
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                0,05 € /min
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                From 241 to 600 minutes
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                0,04 € /min
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                Maximum daily amount
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                26,95 €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-8 flex justify-center'>
        <table className="text-center text-erieblack table-fixed border-collapse border border-erieblack/90">
          <thead className="text-xs text-erieblack font-bold uppercase md:text-md bg-silver">
            <tr >
              <th scope="col" className="px-6 py-2 border border-erieblack/90">CALCULATE YOUR RATE</th>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">PRICES</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-ghostwhite">
              <td scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                1 hour
              </td>
              <td className="px-6 py-4 border border-erieblack/90">
                3,6 €
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                2 hours
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                6,6 €
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                3 hours
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                9,6 €
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                4 hours
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                12,6 €
              </td>
            </tr>
            <tr>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                10 hours
              </td>
              <td
                className="px-6 py-4 border border-erieblack/90">
                26,95 €
              </td>
            </tr>
          </tbody>

        </table>

      </div>
      <div className="flex justify-center text-md sm:text-lg pt-4 font-light">
        From the 10th hour to 24 hours, €26.95 is charged.
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