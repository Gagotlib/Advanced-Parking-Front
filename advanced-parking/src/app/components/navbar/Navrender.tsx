'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'
import Footer from '../footer/Footer'

const NavRender = () => {
	const pathname = usePathname()
	console.log(pathname)
	if (pathname === '/') {
		return null
	} else {
		return <Navbar />
	}
}

const FooterRender = () => {
	const pathname = usePathname()
	if (pathname === '/' || pathname === '/login' || pathname === '/register') {
		return null
	} else {
		return <Footer />
	}
}

export { NavRender, FooterRender }
