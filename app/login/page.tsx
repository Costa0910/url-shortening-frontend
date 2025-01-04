"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Auth from "@/components/Auth";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { AuthFormSchema } from "@/types/AuthFormSchema";
import { apiFetch } from "@/utils/apiPost";

type loginData = z.infer<typeof AuthFormSchema>;

function LoginContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified) {
      localStorage.removeItem("temp");
    }
  }, [searchParams]);

  const handleSubmit = async (values: loginData) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiFetch<loginData>(values, "/api/auth/login", "POST");
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          Sign in to your account
        </h2>
        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Auth btnText="Login" onSubmit={handleSubmit} isLoading={isLoading} />
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create here
          </Link>
        </p>
      </div>
    </>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <LoginContent />
      </div>
    </Suspense>
  );
}