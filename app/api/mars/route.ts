import { NextRequest, NextResponse } from "next/server";
import { getMarsPhotos } from "@/lib/nasa";
import { ROVERS, type Rover } from "@/lib/types";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const roverParam = params.get("rover")?.toLowerCase() ?? "curiosity";
  const rover = (ROVERS as string[]).includes(roverParam)
    ? (roverParam as Rover)
    : "curiosity";
  const page = Number(params.get("page") ?? "1") || 1;

  try {
    const photos = await getMarsPhotos(rover, page);
    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
