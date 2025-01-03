import { NextResponse } from "next/server";

export interface LoginResponse extends NextResponse {
    accessToken: string;
    expiration: number;
    tokenType: string;
    userId: string;
    userName: string;
  }