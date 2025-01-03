import { cookies } from "next/headers";
import { updateExpirationDate } from "@/types/updateExpirationDate";
import { DeleteUrl, UpdatedUrl } from "@/utils/shortUrlService";
import { BaseUrl } from "@/types/BaseUrl";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ selectedUrl: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { selectedUrl } = await params;
    const body = await req.json();
    const urlToUpdate = body as updateExpirationDate;
    const updatedUrl = await MakeRequestBaseOnField(selectedUrl, urlToUpdate);
    return new Response(JSON.stringify(updatedUrl), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message || "Something went wrong, try again", {
        status: 500,
      });
    }
    return new Response("Something went wrong, try again", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ selectedUrl: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { selectedUrl } = await params;
    await DeleteUrl(selectedUrl);
    return new Response("Url deleted successfully", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message || "Something went wrong, try again", {
        status: 500,
      });
    }
    return new Response("Something went wrong, try again", { status: 500 });
  }
}

async function MakeRequestBaseOnField(
  selectedUrl: string,
  { expiresAt, field, Url }: updateExpirationDate
): Promise<BaseUrl> {
  switch (field) {
    case "both":
      const both = { expiresAt, shortCode: selectedUrl, url: Url };
      return await UpdatedUrl("update", both);
      break;
    case "expiresAt":
      const body = { expiresAt, shortCode: selectedUrl, url: Url };
      return await UpdatedUrl("expire", body);
      break;
    case "shortCode":
      const shortCode = { expiresAt: null, shortCode: selectedUrl, url: Url };
      return await UpdatedUrl(selectedUrl, shortCode);
      break;
    default:
      throw new Error("Invalid field");
  }
}
