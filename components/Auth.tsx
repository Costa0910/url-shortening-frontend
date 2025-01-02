"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormSchema } from "@/types/AuthFormSchema";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth({
  btnText,
  onSubmit,
  isLoading,
}: {
  btnText: string;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof AuthFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input autoComplete="password" type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must have uppercase, lowercase, special character, and
                numbers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <BeatLoader size={8} color="#ff7c03" /> : btnText}
        </Button>
      </form>
    </Form>
  );
}
