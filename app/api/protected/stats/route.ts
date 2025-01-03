import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GetUserUrls } from "@/utils/shortUrlService";
import { comboBoxUrlStats } from "@/types/Stats";
import { ShortUrlTable } from "@/types/ShortUrlTable";
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.redirect("/login");
    }

    const userUrls = await GetUserUrls();
    const urlStats = formatStats(userUrls);
    return NextResponse.json(urlStats);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

function formatStats(stats: ShortUrlTable[]): comboBoxUrlStats[] {
  return stats.map((stat) => {
    const url = new URL(stat.url);
    const host = url.hostname;
    return {
      label: host + ` [${stat.shortCode}]`,
      shortCode: stat.shortCode,
    };
  });
}
