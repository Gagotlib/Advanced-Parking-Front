import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Navprofile() {

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className='flex items-center md:order-2 relative'>
      <button
        type='button'
        onClick={toggleMenu}
        className='flex text-sm bg-erieblack rounded-full md:me-0 focus:ring-4 focus:ring-silver ml-2'
        id='dropdownInformationButton'
        aria-expanded={menuOpen ? 'true' : 'false'}
        data-dropdown-toggle='dropdownInformation'
        data-dropdown-placement='bottom'
      >
        <span className='sr-only'>Open user menu</span>
        <Image className='w-8 h-8 rounded-full' src='/advanced_parking.jpg' alt='user photo' width={300} height={300} />
      </button>

      <div className={`z-50 ${menuOpen ? '' : 'hidden'} my-4 text-base list-none bg-ghostwhite divide-y divide-silver rounded-lg shadow fixed top-12 right-0 md:right-10`} id='dropdownInformation'>
        <div className='px-4 py-3'>
          <span className='block text-sm text-erieblack'>User Name</span>
          <span className='block text-sm text-silver truncate'>user@email.com</span>
        </div>
        <ul className='py-2' aria-labelledby='dropdownInformationButton'>
          <li>
            <Link href='#' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href='#' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
              Settings
            </Link>
          </li>
          <li>
            <Link href='#' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
              Invoices
            </Link>
          </li>
          <li>
            <Link href='#' className='block px-4 py-2 text-sm text-erieblack hover:bg-silver'>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navprofile