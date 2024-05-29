'use client'

import { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, MapControl, ControlPosition } from '@vis.gl/react-google-maps'
import { CustomZoomControl } from './CustomZoomControl'
import { useAuth } from '@/app/context/AuthContext'
import Link from 'next/link'

function OurParkingsMaps() {
	const [zoom, setZoom] = useState(12)
	const { allParkings, setAllParkings } = useAuth()
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const [controlPosition, setControlControlPosition] = useState<ControlPosition>(ControlPosition.LEFT_BOTTOM)

	const latLocalStorage = localStorage.getItem('lat')
	const lngLocalStorage = localStorage.getItem('lng')

	const positionDefault = {
		lat: Number(latLocalStorage) || 0,
		lng: Number(lngLocalStorage) || 0
	}

	const defaultCenter = {
		lat: -34.590422,
		lng: -58.392357
	}

	const [userPosition, setUserPosition] = useState({ lat: positionDefault.lat, lng: positionDefault.lng })
	// Solicita permisos de geolocalización
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					// console.log('Tomando posicion del navegador', latitude, longitude)
					setUserPosition({ lat: latitude, lng: longitude })
					localStorage.setItem('lat', latitude.toString())
					localStorage.setItem('lng', longitude.toString())
				},
				(error) => {
					console.error('Error obteniendo la geolocalización: ', error)
				}
			)
		} else {
			localStorage.removeItem('lat')
			localStorage.removeItem('lng')
			setUserPosition({ lat: 0, lng: 0 })
			console.error('La geolocalización no es soportada por este navegador.')
		}
	}, [])

	const parkingValues = allParkings?.map((parking) => {
		return {
			position: {
				lat: parseFloat(parking.lat),
				lng: parseFloat(parking.lng)
			},
			name: parking.name,
			id: parking.id,
			address: parking.location
		}
	})

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
			<div className='relative w-full h-[60vh]'>
				<Map
					mapId={process.env.NEXT_PUBLIC_MAP_ID}
					zoom={zoom}
					onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
					disableDefaultUI={true}
					gestureHandling={'greedy'}
					defaultCenter={userPosition.lat !== 0 ? userPosition : defaultCenter}
				>
					<MapControl position={ControlPosition.TOP_LEFT}>
						<div
							style={{
								background: 'white',
								padding: '1em',
								color: 'black'
							}}
						>
							Zoom: {zoom.toFixed(2)}
						</div>
					</MapControl>
					<CustomZoomControl controlPosition={controlPosition} zoom={zoom} onZoomChange={(zoom) => setZoom(zoom)} />

					{userPosition.lat !== 0 && <AdvancedMarker position={userPosition}></AdvancedMarker>}

					{parkingValues?.map((parking, index) => (
						<div key={index}>
							<AdvancedMarker position={parking.position} onClick={() => setOpenIndex(index)}>
								<Pin background={'#FFCC00'} glyphColor={'#1C1C1C'} borderColor={'#1C1C1C'} />
							</AdvancedMarker>
							{openIndex === index && (
								<InfoWindow position={parking.position} onCloseClick={() => setOpenIndex(null)}>
									<p className='font-bold'>Parking {parking.name}</p>
									<p className='font-light'>{parking.address}</p>
									<Link href={`/ourparkings/${parking.id}`} className='underline decoration-yaleblue text-yaleblue'>
										View details
									</Link>
								</InfoWindow>
							)}
						</div>
					))}
				</Map>
			</div>
		</APIProvider>
	)
}

export default OurParkingsMaps
