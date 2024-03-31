import { z } from "zod";

// Generated from https://ember-core.stoplight.io/docs/api-documentation/43512cefd7b4a-get-trip-info
// using https://transform.tools/json-to-zod

export const Trip = z.object({
  route: z.array(
    z.object({
      id: z.number(),
      departure: z.object({
        scheduled: z.string(),
        actual: z.string().optional(),
        estimated: z.string(),
      }),
      arrival: z.object({
        scheduled: z.string(),
        actual: z.string().optional(),
        estimated: z.string(),
      }),
      location: z.object({
        id: z.number(),
        type: z.string(),
        name: z.string(),
        region_name: z.string(),
        code: z.string(),
        code_detail: z.string(),
        detailed_name: z.string(),
        lon: z.number(),
        lat: z.number(),
        google_place_id: z.string(),
        atco_code: z.string(),
        timezone: z.string(),
        zone: z.array(
          z.object({ latitude: z.number(), longitude: z.number() })
        ),
        heading: z.number(),
        direction: z.string().optional(),
        local_name: z.string().optional(),
      }),
      allow_boarding: z.boolean(),
      allow_drop_off: z.boolean(),
      booking_cut_off_mins: z.number(),
      pre_booked_only: z.boolean(),
      skipped: z.boolean(),
      predictions: z.object({ state_of_charge: z.number() }).optional(),
    })
  ),
  vehicle: z.object({
    seat: z.number(),
    wheelchair: z.number(),
    bicycle: z.number(),
    id: z.number(),
    plate_number: z.string(),
    name: z.string(),
    has_wifi: z.boolean(),
    has_toilet: z.boolean(),
    type: z.string(),
    brand: z.string(),
    colour: z.string(),
    is_backup_vehicle: z.boolean(),
    owner_id: z.number(),
    gps: z.object({
      last_updated: z.string(),
      longitude: z.number(),
      latitude: z.number(),
      heading: z.number(),
    }),
  }),
  description: z.object({
    route_number: z.string(),
    pattern_id: z.number(),
    calendar_date: z.string(),
    type: z.string(),
    is_cancelled: z.boolean(),
    route_id: z.number(),
  }),
});

export type TripT = z.infer<typeof Trip>;
