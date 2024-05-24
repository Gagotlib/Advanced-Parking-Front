import React from 'react'
import { ReserveButton } from '../components/buttons/Buttons'
import Image from 'next/image'

function HowItWorks() {
  return (
    <div className='pt-28 text-erieblack pb-10'>
      <h1 className='text-xl font-extrabold sm:text-6xl pl-6'>How does it work?</h1>
      <div className='px-10 sm:px-20 py-10 '>
        <ol className='list-decimal text-erieblack text-sm sm:text-xl list-outside text-left'>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> Reserve a place on the website, </span> and immediately receive your payment receipt via email.
          </li>
          <div className='flex justify-start lg:justify-center items-center py-8 gap-8 overflow-x-auto scroll-smooth lg:overflow-x-hidden'>
            <div className='flex-shrink-0'>
              <Image
                src="/stepOne-1.webp"
                alt="Image Step One-1"
                className='w-[180px] h-[400px]'
                width={500}
                height={500}
                priority
              />
            </div>
            <div className='flex-shrink-0'>
              <Image
                src="/stepOne-2.webp"
                alt="Image Step One-2"
                className='w-[180px] h-[400px]'
                width={500}
                height={500}
                priority
              />
            </div>
            <div className='flex-shrink-0'>
              <Image
                src="/stepOne-3.webp"
                alt="Image Step One-3"
                className='w-[180px] h-[400px]'
                width={500}
                height={500}
                priority
              />
            </div>
            <div className='flex-shrink-0'>
              <Image
                src="/stepOne-4.webp"
                alt="Image Step One-4"
                className='w-[180px] h-[400px]'
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> On your way in, proceed to the property,</span> scan the QR code on your ticket for access and drive to the selected parking area.
          </li>
          <div className='flex justify-center items-center py-8 gap-8'>
            <Image
              src="/stepTwo-1.webp"
              alt="Image Step Two-1"
              className='w-[180px] h-[400px]'
              width={500}
              height={500}
              priority
            />
            <Image
              src="/stepTwo-2.webp"
              alt="Image Step Two-2"
              className='w-[180px] h-[400px]'
              width={500}
              height={500}
              priority
            />
          </div>
          <li className='marker:text-yaleblue marker:font-bold'>
            <span className='text-yaleblue font-medium antialiased '> When your reservation ends, </span> rate the service through the web application.
          </li>
          <div className='flex justify-center items-center py-8 gap-8'>
            <Image
              src="/stepThree-1.webp"
              alt="Image Step Three-1"
              className='w-[180px] h-[400px]'
              width={500}
              height={500}
              priority
            />
            <Image
              src="/stepThree-2.webp"
              alt="Image Step Three-2"
              className='w-[180px] h-[400px]'
              width={500}
              height={500}
              priority
            />
          </div>
        </ol>
      </div >
      <div className='flex justify-center'>
        <ReserveButton />
      </div>
    </div >
  )
}

export default HowItWorks