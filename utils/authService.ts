import axios, { AxiosError } from "axios";
import { LoginResponse } from "@/types/LoginResponse";
import { AGENT_CONFIG } from "./axiosConfig";


export async function loginService(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.API_BASE_URL}/auth/login`,
      { email, password },
      AGENT_CONFIG
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Unable to connect to the server.");
      }
      throw new Error(
        error.response?.data?.message || "Email or Password is invalid"
      );
    }
    throw error;
  }
}

export async function registerService(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/auth/register`,
      { email, password },
      AGENT_CONFIG
    );

    if (response.status === 200) return;
    throw new Error("Something went wrong");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Unable to connect to the server.");
      }
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw error;
  }
}

export async function ConfirmEmailService(
  email: string,
  confirmationCode: string
) {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/auth/confirmEmail`,
      { email, confirmationCode },
      AGENT_CONFIG
    );

    if (response.status === 200) return;
    throw new Error("Something went wrong");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Unable to connect to the server.");
      }
      throw new Error(
        error.response?.data?.message || "Email confirmation failed"
      );
    }
    throw error;
  }
}
