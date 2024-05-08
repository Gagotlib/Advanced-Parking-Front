import Link from 'next/link'
import React from 'react'


export default function not_found() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-not_found bg-cover bg-center ">
      <h1 className="text-9xl font-extrabold text-duck-yellow tracking-widest">404</h1>
      <div className="bg-erieblack px-2 text-sm rounded rotate-12 absolute">
        <p className='text-silver font-bold'>Page Not Found</p>
      </div>
      <button className="mt-5">
        <Link href="/home"
          className="relative inline-block text-sm font-medium text-erieblack group focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yaleblue group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>
          <span className="relative block px-8 py-3 bg-silver border border-current font-semibold">
            Go Home
          </span>
        </Link>
      </button>
    </div>
  )
}
