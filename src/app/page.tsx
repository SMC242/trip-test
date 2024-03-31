import React from "react";

import { type QuotesT } from "@/models/quotes";
import { getQuotes } from "@/queries/quotes";
import { getTrip } from "@/queries/trip";
import { type TripT } from "@/models/trip";
import LiveMap from "./liveMap";
import ErrorMessage from "./_components/errorMessage";
import TripInfo from "./_components/tripInfo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./_components/ui/accordion";
import dynamic from "next/dynamic";
import { BarLoader } from "react-spinners";

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
async function findTrip(): Promise<
  { trip: TripT; quote: QuotesT["quotes"][number] } | undefined
> {
  const { start, end } = getDayRange();
  const quotesResult = await getQuotes({
    origin: ORIGIN,
    destination: DESTINATION,
    startTime: start,
    endTime: end,
  });

  if (quotesResult.status === "error") return undefined;

  const firstQuote = selectTrip(quotesResult?.data);
  if (firstQuote === undefined) return undefined;
  const tripUID = firstQuote.legs[0].trip_uid;

  const tripResult = await getTrip(tripUID);
  return tripResult.status === "success"
    ? { trip: tripResult.data, quote: firstQuote }
    : undefined;
}

function TripInfoAccordion({ trip }: { trip: TripT }) {
  return (
    <Accordion className="" type="single" collapsible>
      <AccordionItem value="bus">
        <AccordionTrigger>Bus Details</AccordionTrigger>
        <AccordionContent>
          <TripInfo trip={trip} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const DynamicMap = dynamic(async () => await import("./liveMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default async function Home() {
  const trip = await findTrip();

  return (
    <main className="m-2">
      <h1 className="text-4xl my-4 text-brand-primary">Your Journey</h1>
      {trip === undefined && (
        <ErrorMessage>
          No trip found. Please check your internet connection and refresh the
          page to try again.
        </ErrorMessage>
      )}
      {trip !== undefined && (
        <>
          <DynamicMap initialTrip={trip.trip} quote={trip.quote} />
          <TripInfoAccordion trip={trip.trip} />
        </>
      )}
    </main>
  );
}
