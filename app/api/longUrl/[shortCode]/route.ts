import { NextResponse } from "next/server";
import axios from "axios";
import { AGENT_CONFIG } from "@/utils/axiosConfig";
// import { ShortUrlResponse } from "@/types/ShortUrlResponse";
import { BaseUrl } from "@/types/BaseUrl";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const shortCode = (await params).shortCode;

    if (!shortCode) {
      return NextResponse.json(
        { error: "shortCode parameter is missing" },
        { status: 400 }
      );
    }

    const ip = req.headers.get("x-forwarded-for");
    const referer = req.headers.get("referer");
    const userAgent = req.headers.get("user-agent");

    const response = await axios.get<BaseUrl>(
      `${process.env.API_BASE_URL}/shorten/${shortCode}`,
      {
        headers: {
          Referer: referer,
          "User-Agent": userAgent,
          "X-Forwarded-For": ip,
        },
        ...AGENT_CONFIG,
      }
    );

    return NextResponse.json(response.data.url, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Couldn't find URL" },
      { status: 500 }
    );
  }
}
