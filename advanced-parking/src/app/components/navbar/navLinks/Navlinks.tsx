import Link from 'next/link'
import React, { useState } from 'react'
import Navprofile from '../navProfile/Navprofile'

function Navlinks() {

  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
      <div className='flex items-center md:order-2 relative'>
        <button
          data-collapse-toggle='navbar-user'
          onClick={toggleNav}
          type='button'
          className='inline-flex items-center p-1 w-10 h-10 justify-center text-sm text-erieblack rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-silver'
          aria-controls='navbar-user'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15' />
          </svg>
        </button>
      </div>
      <div className={`items-center ${navOpen ? '' : 'hidden'} justify-between w-full md:flex md:w-auto md:order-1 max-md:fixed top-20 right-0 z-50 bg-duck-yellow `} id='navbar-user'>
        <ul className='flex flex-col items-center font-medium p-4 md:p-0 mt-4 border bg-none md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-none'>
          <li>
            <Link href='/home' className='block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0' aria-current='page'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/about' className='block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0'>
              About
            </Link>
          </li>
          <li>
            <Link href='#' className='block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue  md:p-0'>
              Services
            </Link>
          </li>
          <li>
            <Link href='#' className='block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0'>
              Pricing
            </Link>
          </li>
          <li>
            <Link href='/contact' className='block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navlinks