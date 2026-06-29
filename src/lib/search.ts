export interface VehicleSearchInput {
  location?: string;
  pickupDate?: string;
  returnDate?: string;
}

export function buildSearchUrl(values: VehicleSearchInput): string {
  const params = new URLSearchParams();

  if (values.location) {
    params.set("location", values.location);
  }
  if (values.pickupDate) {
    params.set("startDate", values.pickupDate);
  }
  if (values.returnDate) {
    params.set("endDate", values.returnDate);
  }

  const query = params.toString();
  return query ? `/search?${query}` : "/search";
}

export function parseSearchInputFromParams(
  params: Pick<URLSearchParams, "get">
): VehicleSearchInput {
  return {
    location: params.get("location") ?? undefined,
    pickupDate: params.get("startDate") ?? undefined,
    returnDate: params.get("endDate") ?? undefined,
  };
}
