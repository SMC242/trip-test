import React from "react";

import { Marker } from "react-leaflet";
import { Icon } from "leaflet";

type BusProps = {
  coordinates: [number, number];
  size?: number;
};

export default function Bus({ coordinates, size = 16 }: BusProps) {
  const busIcon = new Icon({
    iconUrl: "/images/bus.svg",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2], // Anchor in centre of icon
  });

  return <Marker position={coordinates} icon={busIcon} />;
}
