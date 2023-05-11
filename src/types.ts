interface NominatimParams {
  q: string;
  format: string;
  limit: number;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export {
  NominatimParams,
  NominatimResponse,
}
