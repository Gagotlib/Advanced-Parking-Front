import React from 'react'
import { ReserveButton } from '../components/buttons/Buttons'
import Maps from '../components/googleMaps/Maps'

function HowItWorks() {
  return (
    <div className='pt-28 text-erieblack pb-10'>
      <h1 className='text-xl font-extrabold sm:text-6xl pl-6'>How does it work?</h1>
      <div className='px-10 sm:px-20 py-10 '>
        <ol className='list-decimal text-erieblack text-sm sm:text-xl list-outside text-left'>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> Reserve a place on the website, </span> and immediately receive your payment receipt via email.
          </li>
          {/* Aqui voy a colocar un pantallazo de 1. buscar el establecimiento y 2.ReservationForm */}
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> On your way in, proceed to the property,</span> scan the QR code on your ticket for access and drive to the selected parking area.
          </li>
          {/* Aqui voy a colocar un pantallazo de: 1.Ticket con el QR al email */}
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> When your reservation ends, </span> rate the service through the web application.
          </li>
          {/* Aqui pantallazo de: 1. Vista de Rating y 2. vista del mensaje en nuestro home.  */}
        </ol>
      </div>
      <div className='flex justify-center'>
        <ReserveButton />
      </div>
    </div>
  )
}

export default HowItWorks