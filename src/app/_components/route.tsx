import React from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

import colours from "@/utils/colours";
import Stop from "./stop";
import useRoute from "../_hooks/useRoute";
import Path from "./path";
import ErrorMessage from "./errorMessage";

type LatLon = { lat: number; lon: number };

type RouteProps = {
  origin: LatLon;
  dest: LatLon;
  /**
   * The stops along the route
   */
  route: Array<{ location: LatLon; id: number }>;
};

/**
 * Display the stops and road path of a route
 */
export default function Route({ origin, dest, route }: RouteProps) {
  const routeResult = useRoute({
    points: route.map((stop) => [stop.location.lat, stop.location.lon]),
  });

  if (routeResult.status === "error" && routeResult.error !== "network-error")
    toast.error("Could not calculate route");

  return (
    <>
      {route.map((stop) => {
        return (
          <Stop
            key={stop.id}
            variant="default"
            coordinates={[stop.location.lat, stop.location.lon]}
          />
        );
      })}
      <Stop variant="origin" coordinates={[origin.lat, origin.lon]} />

      <Stop variant="destination" coordinates={[dest.lat, dest.lon]} />

      <BarLoader loading={routeResult.status === "loading"} />

      {routeResult.status === "error" &&
        routeResult.error === "network-error" && (
          <ErrorMessage>
            Failed to fetch route. Please check your connection and try again
          </ErrorMessage>
        )}

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
    </>
  );
}
