import React from "react";
import { Polyline } from "react-leaflet";

import colours from "@/utils/colours";

type PathProps = {
  points: Array<[number, number]>;
  weight?: number;
  colour?: string;
};

export default function Path({
  points,
  colour = colours["brand-secondary"],
  weight = 3,
}: PathProps) {
  return (
    <div>
      <Polyline positions={points} color={colour} weight={weight} />
    </div>
  );
}
