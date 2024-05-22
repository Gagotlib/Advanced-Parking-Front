'use client'

import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, MapControl, ControlPosition } from '@vis.gl/react-google-maps'
import { CustomZoomControl } from './CustomZoomControl';

function Maps({ latProp, lngProp, nameProp }: { latProp: number; lngProp: number; nameProp: string }) {

  const [controlPosition, setControlControlPosition] =
    useState<ControlPosition>(ControlPosition.LEFT_BOTTOM);

  const [zoom, setZoom] = useState(14);

  const defaultPosition = {
    lat: -latProp,
    lng: -lngProp,
  }

  const [open, setOpen] = useState(false)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string} >
      <div className='relative ml-10 border-2 border-yaleblue/90' style={{ height: '450px', width: '450px' }} >

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
              <p>Parking {nameProp}</p>
            </InfoWindow>}
        </Map>
      </div>
    </APIProvider>
  )
}

export default Maps