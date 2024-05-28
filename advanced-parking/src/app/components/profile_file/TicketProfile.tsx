'use client'

import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import QRGenerator from '../qrcode/QRGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IAppointment {
  date: string;
  duration: string;
  id: string;
  is_parked: boolean;
  license_plate: string;
  parking_lot: {
    id: string;
    lat: string;
    lng: string;
    location: string;
    name: string;
    slots_stock: number;
  };
  slot: {
    id: string;
    slot_number: number;
    slot_status: string;
  };
  slot_number: string;
  status: string;
  time: string;
  total: number;
  user: {
    email: string;
    id: string;
    image: string | null;
    name: string;
    password: string;
    phone: string;
    role: string;
    status: string;
  };
}

const TicketProfile = ({ params }: { params: { id: string } }) => {
  const rute = process.env.NEXT_PUBLIC_BACK_API_URL;
  const [appointmentDetails, setAppointmentDetails] = useState<IAppointment | null>(null);
  const [observer, setObserver] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios
      .get(`${rute}/appointments/${params.id}`, {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      .then(({ data }) => setAppointmentDetails(data))
      .catch(error => console.error('Error fetching appointment details:', error));
  }, [observer]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-28 left-0 w-full h-full flex items-center justify-center z-10 ">
      <div className="relative p-1">

        <Suspense fallback={<h1>Loading...</h1>}>
          {appointmentDetails ? (
            <div className='flex flex-col min-h-screen px-4 pb-4 lg:pt-10'>
              <div className='flex justify-center items-center'>
                <button
                  className="text-ghostwhite hover:text-silver border border-yaleblue rounded-full w-fit p-3 flex items-center justify-center bg-yaleblue"
                  onClick={handleClose}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className='bg-ghostwhite border border-silver/80 rounded-lg shadow-lg shadow-erieblack/80 px-6 mx-auto mt-2'>


                <div className='mb-8'>
                  <h2 className='text-md font-bold mb-4 dark:text-erieblack/80'>
                    Ticket: <span className='text-erieblack/80 text-sm '>{appointmentDetails.id}</span>
                  </h2>
                  <p className='text-erieblack/80 text-sm'>Parking: {appointmentDetails.parking_lot.name}</p>
                  <p className='text-erieblack/80 text-sm'>Check-in date: {appointmentDetails.date}</p>
                  <p className='text-erieblack/80 text-sm'>Check-in hour: {appointmentDetails.time}</p>
                  <div className='flex justify-center items-center'>
                    <QRGenerator />
                  </div>
                  <div className='flex justify-around'>
                    <p className='text-erieblack/80 text-sm'>Slot: {appointmentDetails.slot_number}</p>
                    <p className='text-erieblack/80 text-sm'>Duration: {appointmentDetails.duration} hrs.</p>
                    <p className='text-erieblack/80 text-sm'>License Plate: {appointmentDetails.license_plate}</p>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <div className='flex flex-col min-h-screen md:pt-6'>
              <h3>Loading...</h3>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default TicketProfile;
