"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";
import Image from "next/image";
import Link from "next/link";
import { AuthFormSchema } from "@/types/AuthFormSchema";
import { z } from "zod";
import { apiFetch } from "@/utils/apiPost";

type registerUserData = z.infer<typeof AuthFormSchema>;

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: registerUserData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await apiFetch<registerUserData>(values, "/api/auth/register", "POST");
      localStorage.setItem("temp", values.email);
      router.push("/register/confirm");
    } catch (err) {
      setError(err instanceof Error 
        ? err.message 
        : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <Image
            alt="URL Shortening Illustration"
            src="/url-illustration.svg"
            width={30}
            height={30}
            className="mx-auto h-10 w-auto"
            priority
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Create new account
        </h2>
        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Auth btnText="Create" onSubmit={handleSubmit} isLoading={isLoading} />
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
