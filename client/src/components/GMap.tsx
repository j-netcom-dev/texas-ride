"use client";

import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useMediaQuery } from "@/hooks/use-media-query";

const GMap = () => {
    const isMobile =useMediaQuery("(max-width: 768px)");
    const containerStyle = {
        width: '100%',
        height: isMobile? '200px': '400px'
    };

    const central_point ={ lat: 29.3838, lng: -94.9027 }
    const mapRef =React.useRef<HTMLDivElement>(null);

    React.useEffect(() =>{
      const initMap = async (coords: { lat: number; lng: number; }) =>{
        const loader =new Loader({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, version: 'weekly', });
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');
        const { Map } =await loader.importLibrary('maps');
    
        const mapOptions: google.maps.MapOptions ={
          center: coords,
          zoom: 17,
          mapId: 'Texas Map'
        }
        const gmap =new Map(mapRef.current as HTMLDivElement, mapOptions);
        new AdvancedMarkerElement({
          map: gmap,
          position: coords
        });
        localStorage.setItem('pos', JSON.stringify(coords));
      };
      const getUserGeoLocationSuccess = (position: GeolocationPosition) => {
        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        initMap(coords);
      };
      const getUserGeoLocationError = (error: GeolocationPositionError) => initMap(central_point);

      if(navigator.geolocation) navigator.geolocation.getCurrentPosition(getUserGeoLocationSuccess, getUserGeoLocationError);
      else initMap(central_point);
    }, []);
    
      return <div className='overflow-hidden rounded-md shadow' ref={mapRef} style={containerStyle}/>
}

export default GMap;