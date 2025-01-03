import { cookies } from "next/headers";
// import { ShortUrlResponse } from "@/types/ShortUrlResponse";
import { BaseUrl } from "@/types/BaseUrl";
import { AGENT_CONFIG } from "./axiosConfig";
import axios, { AxiosError } from "axios";
import { ShortUrlTable } from "@/types/ShortUrlTable";
import { shortUrlStats } from "@/types/Stats";

type UpdatedUrlModel = {
  shortCode: string;
  expiresAt: Date | null;
  url: string | null;
};

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});

export async function ShortUrlService(
  url: string,
  expiresAt: Date | null | undefined
) {
  try {
    const response = await apiClient.post<BaseUrl>(
      "/shorten",
      { url, expiresAt },
      AGENT_CONFIG
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't short url, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}

export async function GetTopUrls() {
  try {
    const response = await apiClient.get<BaseUrl[]>(
      "/shorten/topUrls",
      AGENT_CONFIG
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't fetch urls, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}

export async function GetUserUrls() {
  try {
    const response = await apiClient.get<ShortUrlTable[]>(
      "/shorten",
      AGENT_CONFIG
    );
    addStatusBasedOnExpiration(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't fetch urls, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}

export async function GetStats(shortCode: string) {
  try {
    const response = await apiClient.get<shortUrlStats>(
      `/shorten/${shortCode}/stats`,
      AGENT_CONFIG
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't fetch stats, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}
export async function UpdatedUrl(url: string, body: UpdatedUrlModel | null) {
  try {
    const response = await apiClient.put<BaseUrl>(
      `/shorten/${url}`,
      body,
      AGENT_CONFIG
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't update url, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}

function addStatusBasedOnExpiration(data: ShortUrlTable[]) {
  data.forEach((url) => {
    if (url.expiresAt) {
      const expiresAt = new Date(url.expiresAt);
      if (expiresAt < new Date()) {
        url.status = "Expired";
      } else {
        url.status = "Active";
      }
    } else {
      url.status = "Active";
    }
  });
}

export async function DeleteUrl(shortCode: string) {
  try {
    await apiClient.delete(`/shorten/${shortCode}`, AGENT_CONFIG);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Couldn't delete url, try again",
        error
      );
    }

    throw new Error("Something went wrong");
  }
}
