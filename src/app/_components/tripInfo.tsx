import { type TripT } from "@/models/trip";
import React from "react";

type TripInfoProps = {
  trip: TripT;
};

const boolToYesNo = (bool: boolean) => (bool ? "Yes" : "No");

function Item({
  children,
  last,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <>
      <span className="p-2  border-white rounded">{children}</span>
      {!(last ?? false) && <hr className="text-white bg-white my-1 h-0.5" />}
    </>
  );
}

export default function TripInfo({ trip }: TripInfoProps) {
  return (
    <div className="bg-gray-200">
      <Item>
        Bus active: {trip.description.is_cancelled ? "No (cancelled)" : "Yes"}
      </Item>
      <Item>Route number: {trip.description.route_number}</Item>
      <Item>Has toilet: {boolToYesNo(trip.vehicle.has_toilet)}</Item>
      <Item>Has WiFi: {boolToYesNo(trip.vehicle.has_wifi)}</Item>
      <Item>Passenger capacity: {trip.vehicle.seat}</Item>
      <Item>Bicycles on board: {trip.vehicle.bicycle}</Item>
      <Item last>Wheelchairs on board: {trip.vehicle.wheelchair}</Item>
    </div>
  );
}
