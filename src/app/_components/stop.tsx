import { Icon } from "leaflet";
import React from "react";

import { Marker } from "react-leaflet";

export type StopVariant =
  | "default"
  | "origin"
  | "destination"
  | "next-stop"
  | "previous-stop"
  | "skipped";

type StopProps = {
  coordinates: [number, number];
  variant?: StopVariant;
  size?: number;
};

function getIconURL(variant: StopVariant) {
  const BASE_URL = "/images/";
  const variantFileNames: Record<StopVariant, string> = {
    origin: "origin-stop.svg",
    destination: "destination-stop.svg",
    "next-stop": "next-stop.svg",
    "previous-stop": "previous-stop.svg",
    skipped: "skipped-stop.svg",
    default: "default-stop.svg",
  };

  return `${BASE_URL}/${variantFileNames[variant]}`;
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
