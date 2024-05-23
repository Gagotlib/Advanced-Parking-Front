import React from 'react'

function LoadingAboutPhotos() {
  return (
    <div className='w-full lg:w-8/12 lg:pt-8 animate-pulse'>
      <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md'>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
        <div className='md:block hidden rounded-full bg-gray-200' style={{ width: '150px', height: '150px' }}></div>
      </div>
    </div>
  )
}

export default LoadingAboutPhotos