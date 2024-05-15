import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { FooterRender, NavRender } from './components/navbar/Navrender'
import { AuthProvider } from './context/AuthContext'
import Providers from './Providers'

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
		<Providers>
			<AuthProvider>
				<html lang='en'>
					<body className={plus_Jakarta_Sans.className}>
						<NavRender />
						<div className='w-full h-full'>{children}</div>
						<FooterRender />
					</body>
				</html>
			</AuthProvider>
		</Providers>
	)
}
