import { GetUserUrls } from "@/utils/shortUrlService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.redirect("/login");
    }

    const userUrls = await GetUserUrls();
    return NextResponse.json(userUrls);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch user URLs" },
      { status: 500 }
    );
  }
}