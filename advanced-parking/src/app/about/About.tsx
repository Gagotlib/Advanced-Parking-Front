import Image from 'next/image'
import React from 'react'
import { BackToHomeButton, ContactButton } from '../components/buttons/Buttons'
import Link from 'next/link'

function About() {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 pt-24 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-6xl font-extrabold leading-9 text-erieblack">
            About Us
          </h1>
          <p className="font-medium text-base leading-6 text-erieblack ">
            We are an application created to give the user exclusivity when searching for available parking in the urban areas of the city. We provide security, 100% insured parking in the reservation and with exclusive additional benefits.
          </p>
        </div>
        <div className="w-full lg:w-6/12 pt-10">
          <Image
            src="/parking_lot_about.jpg"
            className="w-[400px] h-[400px]"
            alt="Advanced Parking Logo"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl lg:text-5xl font-extrabold leading-9 text-erieblack">
          Resources
        </h1>
        <div className='w-full lg:w-6/12 flex justify-center items-center'>
          <div className="w-full lg:w-6/12 pt-10 flex justify-center flex-col items-center">
            <Image
              src="/icon_nextjs.png"
              className="w-[80px] h-[80px]"
              alt="NextJs Icon"
              priority={true}
              width={500}
              height={500}
            />
            <p className='text-lg '>Next.Js</p>
          </div>
          <div className="w-full lg:w-6/12 pt-10 flex justify-center flex-col items-center">
            <Image
              src="/icon_tailwind.jpeg"
              className="w-[100px] h-[80px]"
              alt="Tailwind CSS Icon"
              priority={true}
              width={500}
              height={500}
            />
            <p className='text-lg '>Tailwind CSS</p>
          </div>
          <div className="w-full lg:w-6/12 pt-10 flex justify-center flex-col items-center">
            <Image
              src="/icon_nestjs.png"
              className="w-[80px] h-[80px]"
              alt="NestJs Icon"
              priority={true}
              width={500}
              height={500}
            />
            <p className='text-lg '>NestJs</p>
          </div>
          <div className="w-full lg:w-6/12 pt-10 flex justify-center flex-col items-center">
            <Image
              src="/icon_postgreSQL.png"
              className="w-[80px] h-[80px]"
              alt="PostgreSQL Icon"
              priority={true}
              width={500}
              height={500}
            />
            <p className='text-lg '>PostgreSQL</p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-9 text-erieblack pb-4">
            Meet the brains
          </h1>
          <p className="font-medium text-base leading-6 text-erieblack">
            We are a work team that has constant communication, we have the ability to resolve conflicts and our spirit of collaboration has been fundamental to the success of this project. This has helped strengthen bonds and increase motivation. We are an incredible team and we are confident that together we will achieve great things in the future.
          </p>
          <p className='font-medium text-base leading-6 text-erieblack pt-2'>
            You can find us on our LinkedIn profile or you can go to <Link
              href="/contact"
              className='text-erieblack font-extrabold underline decoration-silver'>
              Contact
            </Link> and send us a message.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                src=""
                className="md:block hidden"
                alt="Gabriel featured Image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Gabriel featured Image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Gabriel Gotlib</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                src=""
                className="md:block hidden"
                alt="Marcelo featured Image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Marcelo featured Image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Marcelo Lencina</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src=""
                alt="Simon featued Image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Simon featued Image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Simón Salas</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src=""
                alt="Mario featured image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Mario featured image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Mario Gutiérrez</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src=""
                alt="Jose featured image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Jose featured image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Jose Coledani</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src=""
                alt="Sebastian featured image"
                width={150}
                height={150}
                priority={true}
              />
              <Image
                className="md:hidden block"
                src=""
                alt="Sebastian featured image"
                width={150}
                height={150}
                priority={true}
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Sebastian Ibargüen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About