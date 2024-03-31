import { Route } from "@/models/route";
import { query } from "@/utils/request";

/**
 * Use the OSRM API to find a road route through the given points
 */
export async function findRoute(points: Array<[number, number]>) {
  const pointsParam = points
    .map((point) => point[1] + "," + point[0])
    .join(";");
  const url = `http://router.project-osrm.org/route/v1/driving/${pointsParam}?geometries=geojson&overview=full`;
  console.log(url);
  const result = await query(url, {}, Route);

  // Flip the coordinates to [latitude, longitude]
  if (result.status === "success") {
    result.data.routes[0].geometry.coordinates =
      result.data.routes[0].geometry.coordinates.map((point) => [
        point[1],
        point[0],
      ]);
  }

  return result;
}
