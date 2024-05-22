'use client'

import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, MapControl, ControlPosition } from '@vis.gl/react-google-maps'
import { CustomZoomControl } from './CustomZoomControl';
import { useAuth } from '@/app/context/AuthContext';

function OurParkingsMaps() {

  const [zoom, setZoom] = useState(12);
  const { allParkings, setAllParkings } = useAuth()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [controlPosition, setControlControlPosition] = useState<ControlPosition>(ControlPosition.LEFT_BOTTOM);

  const defaultPosition = {
    lat: -34.559524,
    lng: -58.462132
  }

  const parkingValues = allParkings?.map((parking) => {
    return {
      position: {
        lat: -parseFloat(parking.lat),
        lng: -parseFloat(parking.lng),
      },
      name: parking.name,
    };
  });

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string} >
      <div className='relative' style={{ height: '67vh', width: '100%' }} >
        <Map
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          zoom={zoom}
          onZoomChanged={ev => setZoom(ev.detail.zoom)}
          disableDefaultUI={true}
          gestureHandling={'greedy'}
          defaultCenter={defaultPosition}
        >
          <MapControl position={ControlPosition.TOP_LEFT}>
            <div
              style={{
                background: 'white',
                padding: '1em'
              }}>
              Zoom: {zoom.toFixed(2)}
            </div>
          </MapControl>
          <CustomZoomControl
            controlPosition={controlPosition}
            zoom={zoom}
            onZoomChange={zoom => setZoom(zoom)}
          />
          {parkingValues?.map((parking, index) => (
            <div key={index}>
              <AdvancedMarker
                position={parking.position}
                onClick={() => setOpenIndex(index)}
              >
                <Pin
                  background={'#FFCC00'} glyphColor={'#1C1C1C'} borderColor={'#1C1C1C'}
                />
              </AdvancedMarker>
              {openIndex === index && (
                <InfoWindow
                  position={parking.position}
                  onCloseClick={() => setOpenIndex(null)}
                >
                  <p>Parking {parking.name}</p>
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