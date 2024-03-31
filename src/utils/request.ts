import zod from "zod";

export type ResponseError =
  | "bad-request"
  | "authorisation"
  | "network-error"
  | "parse";

/**
 * Do a query with the given URL and options.
 * Wrap the response in a Result type with appropriate errors
 */
export async function query<T>(
  url: string,
  options: RequestInit,
  schema: zod.Schema<T>
): Promise<Result<ResponseError, T>> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return { status: "error", error: "bad-request" };
        case 401:
          return { status: "error", error: "authorisation" };
        default:
          return { status: "error", error: "network-error" };
      }
    }

    try {
      const data = await response.json();
      return { status: "success", data: schema.parse(data) };
    } catch (error) {
      return { status: "error", error: "parse" };
    }
  } catch (error) {
    if (error instanceof Error && error.name === "NetworkError") {
      return { status: "error", error: "network-error" };
    } else throw error;
  }
}
