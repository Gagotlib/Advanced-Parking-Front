'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-duck-yellow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo_advanced_parking.jpg"
            className=""
            alt="Advanced_Parking Logo"
            width={80}
            height={80}
            priority={true}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-erieblack">Advanced Parking</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            onClick={toggleMenu}
            className="flex text-sm bg-erieblack rounded-full md:me-0 focus:ring-4 focus:ring-silver"
            id="dropdownInformationButton"
            aria-expanded={menuOpen ? "true" : "false"}
            data-dropdown-toggle="dropdownInformation"
            data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <Image className="w-8 h-8 rounded-full"
              src="/advanced_parking.jpg"
              alt="user photo"
              width={300}
              height={300}
            />
          </button>
          {/* Dropdown menu */}
          <div
            className={`z-50 ${menuOpen ? '' : 'hidden'} my-4 text-base list-none bg-ghostwhite divide-y divide-silver rounded-lg shadow fixed top-12 right-0 md:right-10`}
            id="dropdownInformation">
            <div className="px-4 py-3">
              <span className="block text-sm text-erieblack">User Name</span>
              <span className="block text-sm text-silver truncate">user@email.com</span>
            </div>
            <ul className="py-2" aria-labelledby="dropdownInformationButton">
              <li>
                <Link href="#"
                  className="block px-4 py-2 text-sm text-erieblack hover:bg-silver">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#"
                  className="block px-4 py-2 text-sm text-erieblack hover:bg-silver">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 text-sm text-erieblack hover:bg-silver">
                  Invoices
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 text-sm text-erieblack hover:bg-silver">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-silver rounded-lg md:hidden hover:bg-silver focus:outline-none focus:ring-2 focus:ring-silver"
            aria-controls="navbar-user"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border bg-none md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-none">
            <li>
              <Link
                href="/home"
                className="block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0"
                aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0">
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue  md:p-0">
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-erieblack rounded hover:bg-silver md:hover:bg-transparent md:hover:text-yaleblue md:p-0">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar