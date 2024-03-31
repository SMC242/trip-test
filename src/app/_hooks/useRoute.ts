import { useQuery } from "@tanstack/react-query";
import { findRoute } from "@/queries/findRoute";

export type UseRouteOptions = {
  points: Array<[number, number]>;
  pollingIntervalMs?: number;
};

type RouteResult = Awaited<ReturnType<typeof findRoute>>;

export type UseRouteResult =
  | RouteResult
  | {
      status: "loading";
      isLoading: true;
    };

/**
 * Find a road route through the given points.
 */
export default function useRoute({ points }: UseRouteOptions): UseRouteResult {
  const pathResult = useQuery({
    queryFn: async () => await findRoute(points),
    queryKey: ["path", points],
  });

  // Combine UseQueryResult and Result into a single type
  if (pathResult.isError) return { status: "error", error: "network-error" };
  else if (pathResult.isLoading) return { status: "loading", isLoading: true };
  else if (pathResult.isSuccess && pathResult.data.status === "error")
    return { status: "error", error: pathResult.data.error };
  else if (pathResult.isSuccess && pathResult.data.status === "success")
    return pathResult.data;
  else throw new Error("Unknown status");
}
