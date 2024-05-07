'use client'
import Toast from '@/app/components/alerts/Toast'
import { IErrors, IUser } from '@/types'
import { validateRegister } from '@/app/utils/formsValidation'
// import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const RegisterForm = () => {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (showToast || errorToast) {
      const timeout = setTimeout(() => {
        setShowToast(false)
        setErrorToast(false)
        setErrorMessage('')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast, errorToast])
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false)
        router.push('/login')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast, router])

  const [registerData, setRegisterData] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  })
  const [errors, setErrors] = useState<IErrors>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((user) => ({
      ...user,
      [name]: value
    }))
    const fieldErrors = validateRegister({ ...registerData, [name]: value })
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name]
    }))
  }

  const ruta = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(registerData)
      // await axios.post(`${ruta}/users/register`, registerData)
      setShowToast(true)
    } catch (error: Error | any) {
      console.error('Error al Registrarse:', error?.response?.data.message)
      setErrorToast(true)
      setErrorMessage(error?.response?.data.message || 'An unexpected error occurred')
    }
  }
  return (
    <div className='h-screen'>
      <div className=' w-full h-full flex flex-col items-center pt-24'>
        {showToast && <Toast message='Registered correctly' type='success' />}
        {errorToast && <Toast message={errorMessage} type='error' />}
        <h1 className='title'>Register</h1>
        <form className='flex flex-wrap flex-col justify-center items-center gap-4 m-4 text-center border-2 border-lightgray rounded-xl p-4 w-3/5 text-lg' action='' onSubmit={handleSubmit}>
          <div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
            <label className='mr-4' htmlFor='name'>
              Name:
            </label>
            <input className='border border-gray-300 rounded-lg px-2 py-1 text-lg w-4/5' type='text' id='name' name='name' required value={registerData.name} onChange={handleChange} />
            {errors.name && <p className='text-red-500'>{errors.name}</p>}
          </div>
          <div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
            <label className='mr-4' htmlFor='email'>
              Email:
            </label>
            <input className='border border-gray-300 rounded-lg px-2 py-1 text-lg  w-4/5' type='mail' id='email' name='email' required value={registerData.email} onChange={handleChange} />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
            <label className='mr-4' htmlFor='password'>
              Password:
            </label>
            <input
              className='border border-gray-300 rounded-lg px-2 py-1 text-lg  w-4/5'
              type='password'
              id='password'
              name='password'
              required
              value={registerData.password}
              onChange={handleChange}
            />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          <div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
            <label className='mr-4' htmlFor='address'>
              Address:
            </label>
            <input className='border border-gray-300 rounded-lg px-2 py-1 text-lg w-4/5' type='text' id='address' name='address' required value={registerData.address} onChange={handleChange} />
            {errors.address && <p className='text-red-500'>{errors.address}</p>}
          </div>
          <div className='flex flex-row flex-wrap justify-center items-center w-4/5'>
            <label className='mr-4' htmlFor='phone'>
              Phone:
            </label>
            <input className='border border-gray-300 rounded-lg px-2 py-1 text-lg w-4/5' type='text' id='phone' name='phone' required value={registerData.phone} onChange={handleChange} />
            {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
          </div>
          {Object.values(errors).some((error) => error) ? (
            <button className='border-3 border-solid border-green-500 rounded-lg text-lg py-2 px-4 text-white bg-green-500 hover:bg-green-600' type='submit' disabled>
              Register
            </button>
          ) : (
            <button className='border-3 border-solid border-green-500 rounded-lg text-lg py-2 px-4 text-white bg-green-500 hover:bg-green-600' type='submit'>
              Register
            </button>
          )}
        </form>

        <div className='flex flex-col items-center'>
          <h1>If you already have an account: </h1>
          <Link className='text-orange-500 text-lg px-4 py-2 rounded-lg bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500' href='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

// 'use client'
// import React from 'react'
// import { useState } from 'react'
// import Form from '../components/Form/Form'

// export const Register = () => {
// const [inputDat, setInputDat] = useState(inputData)
// 	const [errors, setErrors] = useState({})
// 	const inputData = [
// 		{
// 			name: 'username',
// 			value: '',
// 			type: 'text',
// 			placeholder: 'Your Username'
// 		},
// 		{
// 			name: 'email',
// 			value: '',
// 			type: 'email',
// 			placeholder: 'Your Email'
// 		},
// 		{
// 			name: 'password',
// 			value: '',
// 			type: 'password',
// 			placeholder: 'Your Password'
// 		}
// 	]
// 	// const authValidate = new AuthService()

// 	const handleSubmit = (e: { preventDefault: () => void }) => {
// 		e.preventDefault()

// 		const username = (document.getElementsByName('username')[0] as HTMLInputElement).value
// 		console.log(username)

// 		const email = (document.getElementsByName('email')[0] as HTMLInputElement).value
// 		console.log(email)
// 		const password = (document.getElementsByName('password')[0] as HTMLInputElement).value
// 		console.log(password)
// 		// setErrors(validateForm({ username: username, password: password }))
// 		// if (errors.length > 0) return

// 		// authValidate
// 		// 	.getAccess(username, password)
// 		// 	.then((access) => access)
// 		// 	.then(({ message, token }) => {
// 		// 		if (!message || !token) return
// 		// 		dispatch(setUser('Admin'))
// 		// 		alert(message)
// 		// 		dispatch(setToken(token))
// 		// 		dispatch(setIsLogged(true))
// 		// 		navigate('/questions-list')
// 		// 	})
// 		// 	.catch((error) => error)
// 	}

// 	return (
// 		<div>
// 			<Form inputData={inputData} buttonValue='Login' onSubmit={handleSubmit} errors={errors} />
// 		</div>
// 	)
// }

// export default Register
