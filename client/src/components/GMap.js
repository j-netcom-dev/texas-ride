"use client";
import React from 'react';
import { useMediaQuery } from "@/hooks/use-media-query";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GMap = () => {
    const isMobile =useMediaQuery("(max-width: 768px)");
    const containerStyle = {
        width: '100%',
        height: isMobile? '200px': '400px'
    };
    
    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      })
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return (
        <section className='overflow-hidden rounded-md'>
          {isLoaded && (<GoogleMap mapContainerStyle={containerStyle} center={center}  zoom={10} onLoad={onLoad} onUnmount={onUnmount}></GoogleMap>)}
        </section>
      )
}

export default GMap;