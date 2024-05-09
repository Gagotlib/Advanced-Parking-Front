'use client'

import Navlinks from './navLinks/Navlinks'
import Navprofile from './navProfile/Navprofile'
import Navlogo from './navLogo/Navlogo'

function Navbar() {

	return (
		<header className="bg-duck-yellow shadow-xl">
			<nav className='flex items-center justify-between px-10 py-4'>
				<div className='max-w-screen-xl'>
					<Navlogo />
				</div>
				<div className='flex'>
					<Navlinks />
				</div>
				<div className='flex'>
					<Navprofile />
				</div>
			</nav>
		</header>
	)
}

export default Navbar
