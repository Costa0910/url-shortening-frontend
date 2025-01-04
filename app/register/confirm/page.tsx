"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ConfirmFormSchema } from "@/types/ConfirmFormSchema";
import { BeatLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/utils/apiPost";

type ConfirmFormData = z.infer<typeof ConfirmFormSchema>;

export default function Confirm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ConfirmFormData>({
    resolver: zodResolver(ConfirmFormSchema),
    defaultValues: {
      email: email || "",
      confirmationCode: "",
    },
  });

  // Handle email retrieval from localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("temp");
      if (!userEmail) {
        router.push("/login");
        return;
      }
      setEmail(userEmail);
    }
  }, [router]);

  useEffect(() => {
    if (email) {
      form.reset({ email, confirmationCode: "" });
    }
  }, [email, form]);

  const onSubmit = async (values: ConfirmFormData) => {
    console.log(values);
    setError(null);
    setIsLoading(true);

    try {
      await apiFetch<ConfirmFormData>(values, "/api/auth/confirmEmail", "POST");
      router.push("/login?verified=true"); // Redirect on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1>Confirm your registration</h1>
        {email ? (
          <p>An email has been sent to {email}. Please check your inbox.</p>
        ) : (
          <p>Something went wrong. Please try again later.</p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}{" "}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="confirmationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter confirmation code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <BeatLoader size={8} color="#ff7c03" />
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
