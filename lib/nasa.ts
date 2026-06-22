import type { ApodResponse, MarsPhoto, Rover } from "@/lib/types";

const NASA_API_KEY = process.env.NASA_API_KEY;
const MARS_SOL = 1000;

async function nasaFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const message =
      res.status === 404 ? "Invalid URL or page not found" : res.statusText;
    throw new Error(`NASA API error ${res.status}: ${message}`);
  }
  return res.json() as Promise<T>;
}

export async function getApod(hd: boolean): Promise<ApodResponse> {
  const url = `https://api.nasa.gov/planetary/apod?hd=${hd}&api_key=${NASA_API_KEY}`;
  return nasaFetch<ApodResponse>(url);
}

export async function getMarsPhotos(
  rover: Rover,
  page: number
): Promise<MarsPhoto[]> {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${MARS_SOL}&page=${page}&api_key=${NASA_API_KEY}`;
  const data = await nasaFetch<{ photos: MarsPhoto[] }>(url);
  return data.photos;
}
