"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useMediaQuery } from "@/hooks/use-media-query";

interface GMapProps {
  setCoordinates: (coords: { lat: number; lng: number }, mode: string) => void;
  currentMode: string;
}

const GMap: React.FC<GMapProps> = ({ setCoordinates, currentMode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerStyle = {
    width: "100%",
    height: isMobile ? "200px" : "400px",
  };

  const central_point = { lat: 29.3838, lng: -94.9027 };
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async (coords: { lat: number; lng: number }) => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");

      const mapOptions: google.maps.MapOptions = {
        center: coords,
        zoom: 17,
        mapId: "Texas Map",
      };
      const gmap = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const createMarker = (position: { lat: number; lng: number }) => {
        if (markerRef.current) {
          markerRef.current.setMap(null); // Remove the old marker from the map
        }
        markerRef.current = new google.maps.Marker({
          map: gmap,
          position,
        });
      };

      createMarker(coords);

      gmap.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const clickedCoords = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          createMarker(clickedCoords);
          setCoordinates(clickedCoords, currentMode);
        }
      });

      localStorage.setItem("pos", JSON.stringify(coords));
    };

    const getUserGeoLocationSuccess = (position: GeolocationPosition) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      initMap(coords);
    };

    const getUserGeoLocationError = (error: GeolocationPositionError) =>
      initMap(central_point);

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        getUserGeoLocationSuccess,
        getUserGeoLocationError
      );
    else initMap(central_point);
  }, [setCoordinates, currentMode]);

  return (
    <div
      className="overflow-hidden rounded-md shadow"
      ref={mapRef}
      style={containerStyle}
    />
  );
};

export default GMap;
