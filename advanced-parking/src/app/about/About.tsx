import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BackToHomeButton, ContactButton } from '../components/buttons/Buttons'

function About() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center px-10'>
      <h1 className=''> About this proyect</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quisquam nemo eos obcaecati, maxime ut dolorum a rem tenetur quas eveniet excepturi. Magni cupiditate illum saepe suscipit eligendi odit. Accusamus? </p>

      <br />
      <h1 className=''> About us</h1>
      <div className='flex flex-col sm:flex-row'>
        <div className='pl-4'>
          <h3 className=''>¿Quienes somos? </h3>
          <p>Acá se colocará la lista de los integrantes del proyecto</p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-center sm:items-end w-full justify-evenly'>
        <BackToHomeButton />
        <br />
        <ContactButton />
      </div>
    </div>
  )
}

export default About