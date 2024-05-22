'use client'
import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'


function Maps() {

  const defaultPosition = {
    lat: -34.616,
    lng: -58.433,
  }

  const [open, setOpen] = useState(false)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string} >
      <div className='relative ml-10 border-2 border-yaleblue/90' style={{ height: '450px', width: '450px' }} >
        <Map
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          zoom={9}
          center={defaultPosition}
          zoomControl={true}
          mapTypeControl={false}
          scaleControl={true}
          streetViewControl={true}
          rotateControl={true}
          fullscreenControl={true}
        >
          <AdvancedMarker
            position={defaultPosition}
            onClick={() => setOpen(true)}
          >
            <Pin
              background={'#FFCC00'} glyphColor={'#1C1C1C'} borderColor={'#1C1C1C'}
            />
          </AdvancedMarker>
          {open &&
            <InfoWindow
              position={defaultPosition}
              onCloseClick={() => setOpen(false)}
            >
              <p>Este es el parking</p>
            </InfoWindow>}
        </Map>
      </div>
    </APIProvider>
  )
}

export default Maps