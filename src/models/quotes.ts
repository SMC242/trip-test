import { z } from "zod";

// Generated from https://ember-core.stoplight.io/docs/api-documentation/a79721f8123d9-get-quotes
// using https://transform.tools/json-to-zod

export const Quotes = z.object({
  quotes: z.array(
    z.object({
      availability: z.object({
        seat: z.number(),
        wheelchair: z.number(),
        bicycle: z.number(),
      }),
      prices: z.object({
        adult: z.number(),
        child: z.number(),
        young_child: z.number(),
        concession: z.number(),
        seat: z.number(),
        wheelchair: z.number(),
        bicycle: z.number(),
      }),
      legs: z.array(
        z.object({
          type: z.string(),
          trip_uid: z.string(),
          adds_capacity_for_trip_uid: z.null(),
          origin: z.object({
            id: z.number(),
            atco_code: z.string(),
            detailed_name: z.string(),
            google_place_id: z.string(),
            lat: z.number(),
            lon: z.number(),
            name: z.string(),
            region_name: z.string(),
            type: z.string(),
            code: z.string(),
            code_detail: z.string(),
            timezone: z.string(),
            heading: z.number(),
            zone: z.array(
              z.object({ longitude: z.number(), latitude: z.number() })
            ),
            area_id: z.number(),
            location_time_id: z.number(),
            booking_cut_off_mins: z.number(),
            pre_booked_only: z.boolean(),
            skipped: z.boolean(),
            bookable: z.string(),
          }),
          destination: z.object({
            id: z.number(),
            atco_code: z.string(),
            detailed_name: z.string(),
            google_place_id: z.string(),
            lat: z.number(),
            lon: z.number(),
            name: z.string(),
            region_name: z.string(),
            type: z.string(),
            code: z.string(),
            code_detail: z.string(),
            timezone: z.string(),
            heading: z.number(),
            zone: z.array(
              z.object({ longitude: z.number(), latitude: z.number() })
            ),
            area_id: z.number(),
            location_time_id: z.number(),
            booking_cut_off_mins: z.number(),
            pre_booked_only: z.boolean(),
            skipped: z.boolean(),
            bookable: z.string(),
          }),
          departure: z.object({ scheduled: z.string() }),
          arrival: z.object({ scheduled: z.string() }),
          description: z.object({
            operator: z.string(),
            destination_board: z.string(),
            number_plate: z.string(),
            vehicle_type: z.string(),
            colour: z.string(),
            amenities: z.object({
              has_wifi: z.boolean(),
              has_toilet: z.boolean(),
            }),
          }),
          trip_type: z.string(),
        })
      ),
      bookable: z.boolean(),
    })
  ),
  min_card_transaction: z.number(),
});

export type QuotesT = z.infer<typeof Quotes>;
