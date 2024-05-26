 "use client"

import Link from 'next/link'
import React, { useState } from 'react'

function Rating() {

  const [rating, setRating] = useState(0);

  const handleChange = (index: any) => {
    setRating(index + 1)
  };

  return (
    <div className="min-h-screen bg-ghostwhite py-6 px-6 flex flex-col justify-center sm:py-12 pt-24">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-ghostwhite min-w-1xl flex flex-col rounded-xl shadow-xl shadow-silver/90  border border-silver">
          <div className="px-12 py-5">
            <h2 className="text-erieblack text-3xl font-bold antialiased sm:text-4xl">Your opinion matters to us!</h2>
          </div>
          <div className="bg-silver/50 w-full flex flex-col items-center border border-yaleblue rounded-lg">
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-erieblack text-center">What did you think of the booking process?</span>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={index === rating - 1}
                    onClick={() => handleChange(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <textarea
                className="p-4 text-erieblack rounded-xl resize-none"
                placeholder='Leave a message, if you want'
              >
              </textarea>
              <button
                className="py-3 my-8 text-lg bg-yaleblue rounded-xl text-ghostwhite font-semibold">
                <Link href="#"> Rate now </Link>
              </button>
            </div>
          </div>
          <div className="h-20 flex items-center justify-center">
            <Link
              href="/home"
              className="text-erieblack text-sm sm:text-md">Maybe later
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rating