import React from 'react'

function BookingDetail() {
  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-4 max-w-md mx-auto mt-2">
      <h1 className="font-bold text-2xl my-4 text-center text-yaleblue">Advanced Parking</h1>
      <hr className="mb-2" />
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Invoice</h1>
        <div className="text-gray-700">
          <div>Date: Fecha de la reserva</div>
          <div>Invoice (Traer el numero del consecutivo del ticket)</div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Ticket To:</h2>
        <div className="text-gray-700 mb-2">Name: User Name</div>
        <div className="text-gray-700">Email: User Name</div>
        <br />
        <div className="text-gray-700 mb-2">Parking: Parking Name</div>
        <div className="text-gray-700 mb-2">Slot: Slot #</div>
        <div className="text-gray-700 mb-2">Address: Address Parking</div>
      </div>
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left font-bold text-gray-700">Description</th>
            <th className="text-left font-bold text-gray-700">Time</th>
            <th className="text-right font-bold text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left text-gray-700">License Plate </td>
            <td className="text-left text-gray-700">1 hour</td>
            <td className="text-right text-gray-700">$100</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="text-left font-bold text-gray-700">Total</td>
            <td className="text-left font-bold text-gray-700"></td>
            <td className="text-right font-bold text-gray-700">$100.00</td>
          </tr>
        </tfoot>
      </table>
      <div className="text-gray-700 mb-10">Thank you for using our services!</div>
    </div>
  )
}

export default BookingDetail