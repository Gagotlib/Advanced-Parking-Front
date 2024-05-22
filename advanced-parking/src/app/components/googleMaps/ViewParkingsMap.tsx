import React from 'react'
import OurParkingsMaps from './OurParkingsMaps'

function ViewParkingsMap({ setIsOpenMap, setIsOverlayFull }: any) {
  return (
    <div className='absolute lg:left-[10rem] lg:w-10/12 lg:top-[8rem] z-10 h-3/4 w-3/4 top-[31.5rem] bg-ghostwhite border border-black shadow-lg rounded-b-lg shadow-silver/80'>
      <div className='pb-2'>
        <OurParkingsMaps />
      </div>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          className='mb-2 py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-yaleblue hover:bg-yaleblue/90 sm:w-fit focus:ring-4 focus:outline-none'
          onClick={() => {
            setIsOpenMap(false)
            setIsOverlayFull(false)
          }}
        >
          {' '}
          Back
        </button>
      </div>
    </div>
  )
}

export default ViewParkingsMap