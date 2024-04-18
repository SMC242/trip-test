"use client";
import React from "react";

import Bus from "./_components/bus";
import Map, { defaultMap } from "@/app/_components/map";
import { type TripT } from "@/models/trip";
import { type QuotesT } from "@/models/quotes";
import Route from "./_components/route";

type LiveMapProps = {
  initialTrip: TripT;
  quote: QuotesT["quotes"][number];
};

/**
 * Client component that displays a live map of a trip.
 *
 * It's necessary to separate this from the main page for 2 reasons:
 * 1. The map can't be rendered on the server due Leaflet
 * 2. It will manage real-time updates to the map and therefore needs to be stateful
 */
export default function LiveMap({ initialTrip, quote }: LiveMapProps) {
  // Retrieve relevant coordinates from the trip and quote
  const origin = quote.legs[0].origin;
  const dest = quote.legs[0].destination;

  // Known issue: current location is not on the path drawn with OSRM.
  // The route is generated using OSRM's fastest route API, which may not match the actual route.
  // Additionally, the bus' location seems to update even after all stops
  // have been visited
  const currentLocation = initialTrip.vehicle.gps;
  const currentCoords: [number, number] = [
    currentLocation.latitude,
    currentLocation.longitude,
  ];

  return (
    // The height has to be static for Leaflet to render correctly
    <div className="w-full h-40 sm:h-96">
      <Map
        map={defaultMap}
        center={currentCoords}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Bus coordinates={currentCoords} />
        <Route origin={origin} dest={dest} route={initialTrip.route} />
      </Map>
    </div>
  );
}
