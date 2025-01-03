import { ConfirmFormSchema } from "@/types/ConfirmFormSchema";
import { NextResponse } from "next/server";
import { ConfirmEmailService } from "@/utils/authService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, confirmationCode } = ConfirmFormSchema.parse(body);
    await ConfirmEmailService(email, confirmationCode);
    return NextResponse.json({ status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong, try again",
      },
      { status: 400 }
    );
  }
}
