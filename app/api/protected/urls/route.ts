import { cookies } from "next/headers";
import { GetUserUrls } from "@/utils/shortUrlService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const urls = await GetUserUrls();
    return NextResponse.json(urls);
  } catch  {
    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}