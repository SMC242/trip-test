import { z } from "zod";

export const Trip = z.object({
  route: z.array(
    z.object({
      id: z.number(),
      departure: z.object({
        scheduled: z.string(),
        actual: z.string().optional(),
        estimated: z.string().optional(),
      }),
      arrival: z.object({
        scheduled: z.string(),
        actual: z.string().optional(),
        estimated: z.string().optional(),
      }),
      location: z.object({
        id: z.number(),
        type: z.string(),
        name: z.string(),
        region_name: z.string().optional(),
        code: z.string().optional(),
        code_detail: z.string().optional(),
        detailed_name: z.string(),
        direction: z.string().optional(),
        local_name: z.string().optional(),
        lon: z.number(),
        lat: z.number(),
        google_place_id: z.string(),
        atco_code: z.string().optional(),
        timezone: z.string(),
        zone: z.array(
          z.object({ latitude: z.number(), longitude: z.number() })
        ),
        heading: z.number(),
      }),
      allow_boarding: z.boolean().optional(),
      allow_drop_off: z.boolean().optional(),
      booking_cut_off_mins: z.number().optional(),
      pre_booked_only: z.boolean().optional(),
      skipped: z.boolean().optional(),
    })
  ),
  vehicle: z.object({
    seat: z.number(),
    wheelchair: z.number(),
    bicycle: z.number(),
    id: z.number(),
    plate_number: z.string(),
    name: z.string(),
    has_wifi: z.boolean().optional(),
    has_toilet: z.boolean().optional(),
    type: z.string(),
    brand: z.string().optional(),
    colour: z.string().optional(),
    is_backup_vehicle: z.boolean().optional(),
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
    pattern_id: z.number().optional(),
    calendar_date: z.string().optional(),
    type: z.string().optional(),
    is_cancelled: z.boolean().optional(),
    route_id: z.number().optional(),
  }),
});

export type TripT = z.infer<typeof Trip>;
