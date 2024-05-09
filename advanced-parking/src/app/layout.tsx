import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Advanced Parking',
	description: 'Generated by Advanced Parking'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={plus_Jakarta_Sans.className}>
				<Navbar />
				<div className='w-full h-full'>
					{children}
				</div>
				<Footer />
			</body>
		</html>
	)
}
