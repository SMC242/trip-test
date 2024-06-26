import { Trip, type TripT } from "@/models/trip";
import env from "@/utils/env";
import { query } from "@/utils/request";

export async function getTrip(tripId: string) {
  return await query(`${env.API_BASE_URL}/trips/${tripId}`, {}, Trip);
}
