import { GetTopUrls } from "@/utils/shortUrlService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.redirect("/login");
    }
    const urls = await GetTopUrls();
      return NextResponse.json(urls);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch recent URLs" },
      { status: 500 }
    );
  }
}
