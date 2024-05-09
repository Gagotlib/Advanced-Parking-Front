'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'
import Footer from '../footer/Footer'

const Navrender = () => {
	const pathname = usePathname()
	console.log(pathname)
	if (pathname === '/') {
		return null // No renderizar el Navbar en la landing page, login o register
	} else {
		return <Navbar />
	}
}

const FooterRender = () => {
	const pathname = usePathname()
	if (pathname === '/' || pathname === '/login' || pathname === '/register') {
		return null // No renderizar el Navbar en la landing page, login o register
	} else {
		return <Footer />
	}
}

export { Navrender, FooterRender }
