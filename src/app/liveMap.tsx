"use client";
import React from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

import Bus from "./_components/bus";
import dynamic from "next/dynamic";
import { defaultMap } from "@/app/_components/map";
import { type TripT } from "@/models/trip";
import Stop from "./_components/stop";
import { type QuotesT } from "@/models/quotes";
import Path from "./_components/path";
import useRoute from "./_hooks/useRoute";
import colours from "@/utils/colours";

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
  // Dynamically import the Map component to avoid loading it on the server.
  // Source: https://medium.com/@shubham3480/dynamic-imports-in-react-3e3e7ad1d210
  const Map = dynamic(async () => await import("@/app/_components/map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  // Retrieve relevant coordinates from the trip and quote
  const origin = quote.legs[0].origin;
  const dest = quote.legs[0].destination;
  const currentLocation = initialTrip.vehicle.gps;
  const currentCoords: [number, number] = [
    currentLocation.latitude,
    currentLocation.longitude,
  ];
  const routeCoords: Array<[number, number]> = initialTrip.route.map((stop) => [
    stop.location.lat,
    stop.location.lon,
  ]);
  console.log(routeCoords);

  const routeResult = useRoute({
    points: routeCoords,
    pollingIntervalMs: 3000,
  });

  if (routeResult.status === "error") toast.error("Could not calculate route");

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
        <Stop variant="origin" coordinates={[origin.lat, origin.lon]} />
        {initialTrip.route.map((stop) => {
          return (
            <Stop
              key={stop.id}
              variant="default"
              coordinates={[stop.location.lat, stop.location.lon]}
            />
          );
        })}
        <Stop variant="destination" coordinates={[dest.lat, dest.lon]} />
        <BarLoader loading={routeResult.status === "loading"} />
        {routeResult.status === "success" && (
          <Path
            points={
              routeResult.data.routes[0].geometry.coordinates as Array<
                [number, number]
              >
            }
            colour={colours["brand-primary"]}
            weight={10}
          />
        )}
      </Map>
    </div>
  );
}
