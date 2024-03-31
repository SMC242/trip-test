import { Quotes, type Quotes as QuotesT } from "@/models/quotes";
import env from "@/utils/env";
import { query } from "@/utils/request";

export async function getQuotes({
  origin,
  destination,
  startTime,
  endTime,
}: {
  origin: number;
  destination: number;
  startTime: Date;
  endTime: Date;
}): Promise<ReturnType<typeof query<QuotesT>>> {
  return await query(
    `${
      env.API_BASE_URL
    }/quotes/?origin=${origin}&destination=${destination}&departure_date_from=${startTime.toISOString()}&departure_date_to=${endTime.toISOString()}`,
    {},
    Quotes
  );
}
