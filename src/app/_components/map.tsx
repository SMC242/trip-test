"use client";
import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  map: {
    attribution: string;
    url: string;
  };
  children?: React.ReactNode;
} & React.ComponentProps<typeof MapContainer>;

// From https://react-leaflet.js.org/
export const defaultMap = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

export default function Map({ map, children, ...props }: MapProps) {
  console.log("rendering");
  return (
    <MapContainer {...props} className="h-full w-full">
      <TileLayer url={map.url} attribution={map.attribution} />
      {children}
    </MapContainer>
  );
}
