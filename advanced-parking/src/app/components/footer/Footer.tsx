import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="p-4 bg-duck-yellow sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/home" className="flex items-center">
              <Image
                src='/logo_advanced_parking.jpg'
                className='h-[100px] w-[100px]'
                alt='Advanced Parking Logo'
                width={100}
                height={100}
                // priority={true}
              />
              <span className="self-center text-3xl lg-text-4xl font-semibold whitespace-nowrap md:whitespace-normal">Advanced Parking</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-erieblack uppercase">Resources</h2>
              <ul className="text-erieblack">
                <li className="mb-2">
                  <Link href="https://nextjs.org/" className="hover:underline">Next.Js</Link>
                </li>
                <li className='mb-2'>
                  <Link href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://nestjs.com/" className="hover:underline">NestJs</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://www.postgresql.org/" className="hover:underline">PostgreSQL</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://www.typescriptlang.org/" className="hover:underline">TypeScript</Link>
                </li>
                <li className="mb-2">
                  <a href="https://github.com/Gagotlib/Advanced-Parking-Front" className="hover:underline ">Github</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-erieblack uppercase">LinkedIn</h2>
              <ul className="text-erieblack">
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/gabriel-gotlib-5855197b/" className="hover:underline ">Gabriel Gotlib</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/sim%C3%B3n-salas-seeber-138112144/" className="hover:underline ">Simón Salas</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/mario-gutierrez-tello/" className="hover:underline ">Mario Gutiérrez</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/mlmarce/" className="hover:underline ">Marcelo Lencina</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/jose-salvador-coledani-grillo-10b857278/" className="hover:underline ">Jose Coledani</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.linkedin.com/in/sebastianibarguen/" className="hover:underline ">Sebastian Ibargüen</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-erieblack uppercase">Legal</h2>
              <ul className="text-erieblack">
                <li className="mb-2">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-ghostwhite sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-erieblack sm:text-center">
            Advanced Parking &copy; 2024. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer