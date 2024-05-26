'use client'

import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, MapControl, ControlPosition } from '@vis.gl/react-google-maps'
import { CustomZoomControl } from './CustomZoomControl'
import Directions from './Directions';

function Maps({ latProp, lngProp, nameProp }: { latProp: number; lngProp: number; nameProp: string }) {

	const [zoom, setZoom] = useState(14)
	const [open, setOpen] = useState(false)

	const [controlPosition, setControlControlPosition] = useState<ControlPosition>(ControlPosition.LEFT_BOTTOM)
	const defaultPosition = {
		lat: latProp,
		lng: lngProp
	}

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
			<div className='relative md:ml-10  border-2 border-yaleblue/90 w-[350px] h-[350px] md:w-[720px] md:h-[370px]'>
				<Map mapId={process.env.NEXT_PUBLIC_MAP_ID} zoom={zoom} onZoomChanged={(ev) => setZoom(ev.detail.zoom)} disableDefaultUI={true} gestureHandling={'greedy'} defaultCenter={defaultPosition}>
					<Directions latProp={latProp} lngProp={lngProp} />
					<MapControl position={ControlPosition.TOP_LEFT}>
						<div
							style={{
								background: 'white',
								padding: '1em'
							}}
						>
							Zoom: {zoom.toFixed(2)}
						</div>
					</MapControl>
					<CustomZoomControl controlPosition={controlPosition} zoom={zoom} onZoomChange={(zoom) => setZoom(zoom)} />
					<AdvancedMarker position={defaultPosition} onClick={() => setOpen(true)}>
						<Pin background={'#FFCC00'} glyphColor={'#1C1C1C'} borderColor={'#1C1C1C'} />
					</AdvancedMarker>
					{open && (
						<InfoWindow position={defaultPosition} onCloseClick={() => setOpen(false)}>
							<p>Parking {nameProp}</p>
						</InfoWindow>
					)}
				</Map>
			</div>
		</APIProvider>
	)
}

export default Maps
