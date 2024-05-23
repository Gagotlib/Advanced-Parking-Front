import React from 'react'

function LoadingMapDetail() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-0 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="relative md:ml-10 border-2 border-gray-200 w-full h-full md:w-72 md:h-72 animate-pulse">
        <div className="h-full w-full bg-gray-200 rounded">
        </div>
      </div>
    </>
  )
}

export default LoadingMapDetail