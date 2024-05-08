'use client'
import Toast from '@/app/components/alerts/Toast'
// import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const LoginForm = () => {
  const router = useRouter()
  const [errorToast, setErrorToast] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast || errorToast) {
      const timeout = setTimeout(() => {
        setShowToast(false)
        setErrorToast(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast, errorToast])

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false)
        router.push('/')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast, router])

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((user) => ({
      ...user,
      [name]: value
    }))
  }
  const ruta = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(loginData)

      // const session = await axios.post(`${ruta}/users/login`, loginData)
      // localStorage.setItem('authToken', session.data.token)
      // localStorage.setItem('user', JSON.stringify(session.data.user))
      // setShowToast(true)
      // throw new Error('Login successful')
    } catch (error: Error | any) {
      console.log(error)
      console.error('Error al iniciar sesión:', error?.response?.data.message)
      setErrorToast(true)
    }
  }

  return (
    <div className='h-screen bg-erieblack'>
      <div className=' w-full h-full flex flex-col items-center pt-24'>
        {showToast && <Toast message='Login successful' type='success' />}
        {errorToast && <Toast message='Username or password are incorrect' type='error' />}
        <h1 className="title text-2xl text-ghostwhite uppercase font-medium mb-1">Login</h1>
        <p className="text-ghostwhite mb-6 text-sm">Welcome! So good to have you back!</p>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              id="email"
              className="block mb-2 text-sm font-medium text-ghostwhite">
              Your email
            </label>
            <input
              type='text'
              id='email'
              name='email'
              className="bg-ghostwhite border border-ghostwhite text-erieblack text-sm rounded-lg focus:ring-yaleblue focus:border-yaleblue block w-full p-2.5"
              placeholder="name@email.com"
              value={loginData.email}
              onChange={handleChange}
              required />
          </div>
          <div className="mb-5">
            <label
              id="password"
              className="block mb-2 text-sm font-medium text-ghostwhite">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-ghostwhite border border-ghostwhite text-erieblack text-sm rounded-lg focus:ring-yaleblue focus:border-yaleblue block w-full p-2.5"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-silver rounded bg-silver focus:ring-3 focus:ring-yaleblue"
                required
              />
            </div>
            <label
              id="remember"
              className="ms-2 text-sm font-normal text-ghostwhite">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-ghostwhite bg-yaleblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-silver font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Log In
          </button>
        </form>
        <div className='flex gap-2 pt-5'>
          <p className="text-ghostwhite text-sm">Don´t have an account?</p><Link className="text-ghostwhite text-sm underline"
            href="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm