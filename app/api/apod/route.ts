import { NextRequest, NextResponse } from "next/server";
import { getApod } from "@/lib/nasa";

export async function GET(request: NextRequest) {
  const hd = request.nextUrl.searchParams.get("hd") === "true";
  try {
    const data = await getApod(hd);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
