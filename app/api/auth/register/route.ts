import { NextResponse } from "next/server";
import { AuthFormSchema } from "@/types/AuthFormSchema";
import { registerService } from "@/utils/authService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = AuthFormSchema.parse(body);
    await registerService(email, password);
    // const response = NextResponse.json({
    //   message:
    //     "Account created successfully, check your email for confirmation code",
    // });

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
