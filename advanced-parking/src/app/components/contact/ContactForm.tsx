'use client'

import Toast from '@/app/components/alerts/Toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SendButton } from '../buttons/Buttons'


function ContactForm() {

  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false)
        router.push('/contact')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast, router])

  function handleOnSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    setShowToast(true)
    return
  }

  return (
    <section className="pt-20">
      <div className="py-4 px-4 mx-auto max-w-screen-md">
        <h1
          className="mb-4 text-4xl font-extrabold text-center text-erieblack sm:text-5xl">
          Contact Us
        </h1>
        {showToast && <Toast message='Your message has been sent correctly' type='success' />}
        <p className="mb-8 lg:mb-16 font-medium italic text-center text-erieblack sm:text-lg">
          Got a technical issue? Want to send feedback about a this project? Need details about our suscriptions plan? Let us know.
        </p>
        <div className='border-silver rounded-lg p-4 m-4 bg-silver/30 drop-shadow-md shadow-lg shadow-erieblack/50'>
          <form className="space-y-8" onSubmit={handleOnSubmit}>
            <div>
              <label
                htmlFor="email"
                id='email'
                className="block mb-2 text-sm font-medium text-erieblack">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-ghostwhite border border-yaleblue text-erieblack text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-erieblack">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-erieblack bg-ghostwhite rounded-lg border border-yaleblue shadow-sm "
                placeholder="How we can help you?"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                className="block p-2.5 w-full text-sm text-erieblack bg-ghostwhite rounded-lg shadow-sm border border-yaleblue resize-none"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <SendButton />
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm