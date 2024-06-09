"use client";

import React, { useEffect, useState } from "react";
import GMap from "@/components/GMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Rides from "@/components/riders/Rides";
import { getGeoPositionName } from "@/services/geo-service";

interface Query {
  from?: string;
  to?: string;
  date?: string;
  time?: string;
}

const Riders: React.FC = () => {
  const [q, setQ] = useState<Query>({});
  const [query, setQuery] = useState<Query>({});
  const [title, setTitle] = useState("Pre-Scheduled rides");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [currentMode, setCurrentMode] = useState<string>("current location");

  useEffect(() => {
    const geo_pos = localStorage.getItem("pos");
    if (geo_pos) {
      const parsedGeoPos = JSON.parse(geo_pos);
      const get_name = async () => {
        const loc = await getGeoPositionName(parsedGeoPos);
        if (loc) setCurrentLocation(loc);
      };
      get_name().then((r) => {});
    }

    if (coordinates.lat && coordinates.lng) {
      const getNameFromCoords = async () => {
        const loc = await getGeoPositionName(coordinates);
        if (loc) {
          if (currentMode === "current location") {
            setCurrentLocation(loc);
            setQ({ ...q, from: loc });
          } else {
            setDestination(loc);
            setQ({ ...q, to: loc });
          }
        }
      };
      getNameFromCoords();
    }
  }, [coordinates, currentMode]);

  return (
    <div className="grid lg:grid-rows-[500px_auto] min-h-screen gap-8">
      <div className="grid lg:grid-cols-[30%_auto] gap-8">
        <div className="">
          <div className="flex flex-col gap-4 bg-white p-4 lg:p-8 rounded-xl shadow-sm">
            <h3 className="uppercase font-semibold">Find ride</h3>
            <div className="flex flex-col gap-8 pe-4 h-max">
              <Input
                placeholder={currentLocation || ""}
                onChange={(e) => setQ({ ...q, from: e.target.value })}
              />
              <Button
                className="w-full"
                onClick={() => setCurrentMode("current location")}>
                Select current location on map
              </Button>
              <Input
                placeholder={destination || "Destination"}
                onChange={(e) => setQ({ ...q, to: e.target.value })}
              />
              <Button
                className="w-full"
                onClick={() => setCurrentMode("destination")}>
                Select destination on map
              </Button>
              <div className="flex gap-4">
                <div className="w-full">
                  <label>Date</label>
                  <Input
                    type="date"
                    onChange={(e) => setQ({ ...q, date: e.target.value })}
                  />
                </div>
                <div className="w-full">
                  <label>Time</label>
                  <Input
                    type="time"
                    onChange={(e) => setQ({ ...q, time: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setQuery(q);
                  setTitle(
                    `Rides ${q?.to ? "to " + q?.to : q?.from ? "from " + q?.from : "found"}`
                  );
                }}>
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-sm">
          <GMap
            setCoordinates={(
              coords: { lat: number; lng: number },
              mode: string
            ) => {
              setCoordinates(coords);
              setCurrentMode(mode);
            }}
            currentMode={currentMode}
          />
        </div>
      </div>
      <Rides title={title} query={query} />
    </div>
  );
};

export default Riders;
