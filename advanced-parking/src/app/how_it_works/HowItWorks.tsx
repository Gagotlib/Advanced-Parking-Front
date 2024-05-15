import React from 'react'
import { ReserveButton } from '../components/buttons/Buttons'

function HowItWorks() {
  return (
    <div className='pt-20 text-erieblack pb-10'>
      <h1 className='text-xl font-extrabold sm:text-6xl pl-6'>How does it work?</h1>
      <div className='px-10 sm:px-20 py-10 '>
        <ol className='list-decimal text-erieblack text-sm sm:text-xl list-outside text-left'>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> Reserve a place on the website, </span> and immediately receive your payment receipt via email.
          </li>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> On your way in, proceed to the parking lot. </span> Drive to the selected parking area, and scan your ticket QR code for access.
          </li>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> On your return, </span> rate the service through the web application.
          </li>
        </ol>
      </div>
      <div className='flex justify-center'>
        <ReserveButton />
      </div>
    </div>
  )
}

export default HowItWorks