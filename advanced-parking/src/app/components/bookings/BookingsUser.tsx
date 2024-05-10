import React from 'react'

function BookingsUser() {

  // Traer la informacion del back segun la interfaces de reservas y luego mapearla en los scopes necesarios 

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='font-bold text-4xl'>My Bookings</h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-center text-erieblack table-auto border-collapse border border-erieblack/90">
          <thead className="text-xs text-erieblack font-bold uppercase md:text-md bg-silver">
            <tr>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">
                Parking Lot
              </th>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">
                Date
              </th>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">
                Hour
              </th>
              <th scope="col" className="px-6 py-2 border border-erieblack/90">
                License Plate
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-ghostwhite">
              <th scope="row"
                className="px-6 py-4 font-medium text-erieblack whitespace-nowrap border-collapse border border-erieblack">
                Name Parkin Lot
              </th>
              <td className="px-6 py-4 border border-erieblack/90">
                10/05/2024
              </td>
              <td className="px-6 py-4 border border-erieblack/90">
                10:00
              </td>
              <td className="px-6 py-4 border border-erieblack/90">
                ARG 123
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingsUser