import React from "react";
import dynamic from "next/dynamic";

import { type QuotesT } from "@/models/quotes";
import { getQuotes } from "@/queries/quotes";
import { getTrip } from "@/queries/trip";
import { defaultMap } from "@/app/_components/map";
import { type TripT } from "@/models/trip";

const ORIGIN = 13;
const DESTINATION = 42;

/**
 * Get the start and end of the current day in the user's timezone.
 */
function getDayRange() {
  // This is a bit more verbose in order to get the full date object
  const start = new Date();
  new Date().toUTCString();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
  };
}

const selectTrip = (quotes: QuotesT): QuotesT["quotes"][number] | undefined =>
  quotes.quotes[0];

// Find a trip for the demo using the hardcoded origin and destination
// and the time range of the current day
async function findTrip(): Promise<TripT | undefined> {
  const { start, end } = getDayRange();
  const quotesResult = await getQuotes({
    origin: ORIGIN,
    destination: DESTINATION,
    startTime: start,
    endTime: end,
  });

  if (quotesResult.status === "error") return undefined;

  const tripUID = selectTrip(quotesResult?.data)?.legs[0].trip_uid;
  if (tripUID === undefined) return undefined;

  const tripResult = await getTrip(tripUID);
  return tripResult.status === "success" ? tripResult.data : undefined;
}

export default function Home() {
  //   const trip = await findTrip();
  //   console.log(trip ?? "failed");

  // Dynamically import the Map component to avoid loading it on the server.
  // Source: https://medium.com/@shubham3480/dynamic-imports-in-react-3e3e7ad1d210
  const Map = dynamic(async () => await import("@/app/_components/map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <main className="m-2">
      <h1 className="text-4xl my-4 text-brand-primary">Your Journey</h1>
      {/* TODO: centre on the trip */}
      {/* The height has to be static for Leaflet to render correctly */}
      <div className="w-full h-40 sm:h-96">
        <Map
          map={defaultMap}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
        ></Map>
      </div>
    </main>
  );
}
