'use client'
import QRGenerator from '@/app/components/qrcode/QRGenerator'
import { useAuth } from '@/app/context/AuthContext'
import React from 'react'
import { CheckIcon } from '../components/icons/icons'
import Image from 'next/image'



function BookingDetail() {
  return (
    <div className='sm:grid sm:grid-cols-2 justify-center items-center min-h-screen pt-28 px-12 pb-10'>
      <div className='flex flex-col items-center gap-2 max-md:hidden'>
        <h1 className='font-bold text-2xl sm:text-5xl'>Advanced Parking</h1>
        <Image
          src='/paymentApproved.webp'
          alt='Image Payment Approved'
          width={400}
          height={400}
          priority={true}
        />
      </div>
      <div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 px-6 mx-auto mt-8'>
        <h1 className='font-bold text-2xl sm:text-3xl my-4 text-center text-erieblack'>Reservation Successful</h1>
        <hr className="mb-1" />
        <div className='flex flex-col mb-2'>
          <p className='flex justify-end text-lg sm:text-2xl font-bold'>Invoice </p>
          <p className='text-sm'>Date: booking.date</p>
        </div>
        <div className='flex justify-center'>
          <QRGenerator />
        </div>
        <div className='mb-8'>
          <h2 className='text-lg font-bold mb-4'>Ticket To: <span className='text-erieblack/80'>booking.id</span></h2>
          <p className='text-erieblack/80 mb-2'>Name: </p>
          <p className='text-erieblack/80'>Email: </p>
          <br />
          <p className='text-erieblack/80 mb-2'>Parking: </p>
          <p className='text-erieblack/80 mb-2'>Slot: </p>
          <p className='text-erieblack/80 mb-2'>Address: </p>
        </div>
        <table className='w-full mb-8'>
          <thead>
            <tr>
              <th className='text-left font-bold text-erieblack'>License Plate</th>
              <th className='text-left font-bold text-erieblack'>Time</th>
              <th className='text-right font-bold text-erieblack'>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-left font-light text-erieblack/80'>AAA-000 </td>
              <td className='text-left font-light text-erieblack/80'>1 hrs</td>
              <td className='text-right font-light text-erieblack/80'>3.55 €</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className='text-left font-bold text-erieblack'>Total</td>
              <td ></td>
              <td className='text-right font-bold text-erieblack'>3.55 €</td>
            </tr>
          </tfoot>
        </table>
        <div className='flex flex-col items-center gap-3'>
          <p className='flex text-center text-xs sm:text-md text-erieblack'>Check your email. Your invoice has been sent.</p>
          <p className='flex text-center text-xs sm:text-md text-erieblack mb-4'>Thank you for using our services!</p>
        </div>
      </div>
    </div>
  )
}

export default BookingDetail
