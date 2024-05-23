import React from 'react'

function LoadingReviews() {
  return (
    <figure className="relative rounded-2xl bg-ghostwhite p-6 shadow-xl shadow-silver/80 flex flex-col gap-y-2 sm:gap-y-1 min-w-80">
      <blockquote className="relative">
        <div className="h-64 bg-gray-200 rounded"></div>
      </blockquote>
      <figcaption className="relative mt-6 flex items-center justify-between border-t border-yaleblue/30 pt-6">
        <div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>
        </div>
        <div className="h-14 w-14 bg-gray-200 rounded-full overflow-hidden"></div>
      </figcaption>
    </figure>
  )
}

export default LoadingReviews