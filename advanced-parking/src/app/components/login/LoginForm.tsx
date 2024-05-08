'use client'
import Toast from '@/app/components/alerts/Toast'
import Image from 'next/image'
// import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import imgLogin from "../../../../public/login.jpg"

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
    <div className='h-screen bg-erieblack '>
      <div className="flex items-center justify-center min-h-screen px-4 py-6 fle-col">
        <div className=' grid items-center w-full gap-4 md:grid-cols-2 max-w-7xl'>
          {showToast && <Toast message='Login successful' type='success' />}
          {errorToast && <Toast message='Username or password are incorrect' type='error' />}
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h1 className="title text-4xl text-ghostwhite uppercase font-extrabold mb-1">Login</h1>
            <p className="text-ghostwhite mb-6 text-sm">Welcome! So good to have you back!</p>
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
                placeholder="********"
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
              Login
            </button>
            <div className="text-center p-2">
              <Link className="inline-block text-sm text-ghostwhite align-baseline hover:text-blue-800"
                href="#">
                Forgot Password?
              </Link>
            </div>
            <div className='flex gap-2 pt-2'>
              <p className="text-ghostwhite text-sm">Don´t have an account?</p>
              <Link
                className="text-ghostwhite text-sm underline hover:text-duck-yellow"
                href="/register">Register here
              </Link>
            </div>
          </form>
          <div>
            <div className="mx-4 mt-4 max-md:hidden">
              <Image
                src={imgLogin}
                alt="concepto-abstracto-sistema-control-acceso"
                width={300}
                height={300}
                priority={true}
                className="inline-block object-cover w-[450px] h-[450px] rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
