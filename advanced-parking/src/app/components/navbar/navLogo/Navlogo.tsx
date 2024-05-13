import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navlogo() {
  return (
    <div className='max-w-screen-xl flex'>
      <Image
        src='/logo_advanced_parking.jpg'
        className='h-auto w-auto '
        alt='Advanced Parking Logo'
        width={60}
        height={60}
        priority={true}
      />
      <Link href='./home' className='flex'>
        <span
          className='self-center text-2xl font-semibold lg:whitespace-nowrap text-erieblack'>
          Advanced Parking
        </span>
      </Link>
    </div>
  )
}

export default Navlogo