import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react'

function Directions({ latProp, lngProp }: { latProp: number; lngProp: number; }) {

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  const positionOrigin = {
    lat: -34.590440,
    lng: -58.392432
  }

  const positionDestionation = {
    lat: -latProp,
    lng: -lngProp
  }

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: positionOrigin,
        destination: positionDestionation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="flex w-full items-center justify-center gap-10 pt-4 sm:pt-0">
      <h3 className='font-bold md:text-xl text-md text-wrap'>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </h3>
      <p>Distance: <span className='font-medium md:text-lg text-sm'> {leg.distance?.text}</span></p>
      <p>Duration: <span className='font-medium md:text-lg text-sm'> {leg.duration?.text}</span></p>
    </div>
  )
}

export default Directions