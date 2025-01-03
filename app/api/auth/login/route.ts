import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthFormSchema } from "@/types/AuthFormSchema";
import { loginService } from "@/utils/authService";

// Cookie config
const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = AuthFormSchema.parse(body);

    // Attempt login
    const { accessToken, userName, expiration } = await loginService(
      email,
      password
    );

    const response = NextResponse.json({
      message: "Login successful",
      username: userName,
      expiration,
    });

    response.cookies.set("token", accessToken, {
      ...COOKIE_CONFIG,
      maxAge: expiration,
    });

    response.cookies.set("username", userName, {
      path: "/",
      maxAge: expiration,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 401 }
    );
  }
}
