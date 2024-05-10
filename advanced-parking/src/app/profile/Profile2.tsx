import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  //! si tuviera un servicio que me trae a un usuario por su id, podria traerme el id del params, y usarlo para traer la info del back en vez del local storage
  const user1 = {
    id: 1,
    name: 'Roberto',
    email: 'roberto@mail.com',
    phone: '123456789',
    role: 'user'
  }
  const user2 = {
    id: 2,
    name: 'Jorge',
    email: 'jorge@mail.com',
    phone: '123456789',
    role: 'user'
  }
  const admin = {
    id: 1111,
    name: 'administrador',
    email: 'admin@mail.com',
    phone: '123456789',
    role: 'admin'
  }
  const allUsers = [user1, user2, admin]
  const user = user1

  return (
    <div className="h-screen">
      <main className="h-3/4 w-full flex flex-col pt-24 gap-4 ">
        <div className="p-2 md:p-4">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">
            Public Profile
          </h2>
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg flex gap-10">
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                <Image className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src="/.jpg"
                  alt="Profile avatar"
                  width={300}
                  height={300}
                />

                {/* <div className="flex flex-col space-y-5 sm:ml-8">
                  <button type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Change picture
                  </button>
                  <button type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Delete picture
                  </button>
                </div> */}
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                <div
                  className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                      name</label>
                    {user?.name}
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                    email</label>
                  {user?.email}
                </div>

                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                    email</label>
                  Mostrar en caso de que el Usuario tenga alguna suscripcion diga Platinum || Gold || Standard
                </div>
              </div>
            </div>
            <div className='w-screen '>
              <p >Aqui quiero mostrar una tabla con el historico de las reservas del usuario.</p>
              <br />
              <p> tabla</p>
              <br />
              <p> Parking Lot || Date || Hour || License Plate </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
