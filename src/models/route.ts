import zod from "zod";

/**
 * A route from the OSRM API
 * @see http://project-osrm.org/docs/v5.5.1/api/
 */
export const Route = zod.object({
  code: zod.string(),
  routes: zod.array(
    zod.object({
      geometry: zod.object({
        coordinates: zod.array(zod.array(zod.number())),
        type: zod.string(),
      }),
      legs: zod.array(
        zod.object({
          steps: zod.array(zod.unknown()),
          summary: zod.string(),
          weight: zod.number(),
          duration: zod.number(),
          distance: zod.number(),
        })
      ),
      weight_name: zod.string(),
      weight: zod.number(),
      duration: zod.number(),
      distance: zod.number(),
    })
  ),
  waypoints: zod.array(
    zod.object({
      hint: zod.string(),
      distance: zod.number(),
      name: zod.string(),
      location: zod.array(zod.number()),
    })
  ),
});

export type RouteT = zod.infer<typeof Route>;
