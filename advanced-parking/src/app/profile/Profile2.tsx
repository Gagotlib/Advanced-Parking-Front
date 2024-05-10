import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BookingsUser from '../components/bookings/BookingsUser'

const Profile = () => {
  //! si tuviera un servicio que me trae a un usuario por su id, podria traerme el id del params, y usarlo para traer la info del back en vez del local storage
  const user1 = {
    id: 1,
    name: 'Roberto Sanchez',
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
    <div className="">
      <main className="h-3/4 w-full flex flex-col pt-24 gap-4">
        <div className="p-2 md:p-4">
          <h2 className="pl-6 text-5xl font-bold sm:text-5xl">
            {user?.name}
          </h2>
          <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
            <div className="flex mt-8 gap-5 sm:gap-10">
              <div className="flex flex-col gap-3 items-center space-y-5 sm:space-y-0">
                <Image className="object-cover w-40 h-40 p-10 rounded-full ring-2 ring-duck-yellow"
                  src="/"
                  alt="Profile avatar"
                  width={300}
                  height={300}
                />
                {/* Si no llega a tener imagen debe visualizar solo las iniciales del primer nombre y primer apellido y colocarla como imagen, algo como tipo gmail  */}
                <div className="flex flex-col space-y-5 sm:ml-2">
                  <button type="button"
                    className="py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-yaleblue rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Change picture
                  </button>
                  <button type="button"
                    className="py-2 px-2 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-silver hover:bg-yaleblue/90 hover:text-ghostwhite focus:z-10 focus:ring-4 focus:ring-indigo-200">
                    Delete picture
                  </button>
                </div>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-erieblack">
                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-bold text-yaleblue">Your
                    email</label>
                  {user?.email}
                </div>
                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-bold text-yaleblue">Your Phone</label>
                  {user?.phone}
                </div>
                <div className="mb-2 sm:mb-6">
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-bold text-yaleblue">Suscription</label>
                  Platinum || Gold || Standard
                </div>
              </div>
            </div>
            <BookingsUser />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
