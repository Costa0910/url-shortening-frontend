import { ShortUrlSchema } from "@/types/ShortUrlSchema";
import { ShortUrlService } from "@/utils/shortUrlService";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { expiresAt, url } = ShortUrlSchema.parse({
      url: body.url,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    });
    const shortedUrl = await ShortUrlService(url, expiresAt);
    return NextResponse.json({ ...shortedUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could't short url" },
      { status: 500 }
    );
  }
}
