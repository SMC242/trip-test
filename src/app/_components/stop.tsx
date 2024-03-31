import { Icon } from "leaflet";
import React from "react";

import { Marker } from "react-leaflet";

type StopProps = {
  coordinates: [number, number];
  variant?: "default" | "origin" | "destination" | "next-stop";
  size?: number;
};

function getIconURL(variant: StopProps["variant"]) {
  const BASE_URL = "/images/";
  switch (variant) {
    case "origin":
      return `${BASE_URL}origin-stop.svg`;
    case "destination":
      return `${BASE_URL}destination-stop.svg`;
    case "next-stop":
      return `${BASE_URL}next-stop.svg`;
    default:
      return `${BASE_URL}default-stop.svg`;
  }
}

export default function Stop({
  coordinates,
  variant = "default",
  size = 16,
}: StopProps) {
  const icon = new Icon({
    iconUrl: getIconURL(variant),
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  return <Marker position={coordinates} icon={icon} />;
}