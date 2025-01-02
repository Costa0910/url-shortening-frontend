"use client";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Link as iconLink,
  ChartSpline,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Links",
    url: "/dashboard/links",
    icon: iconLink,
  },
  {
    title: "Stats",
    url: "/dashboard/stats",
    icon: ChartSpline,
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("Unknown");

  useEffect(() => {
    const email = getCookie("username")?.toString();
    if (email) {
      setUsername(email);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      router.push("/");
    } catch (err) {
      alert(`Something went wrong: ${ err instanceof Error? err.message : "Unknown error, try later"}`);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <nav className="flex items-center justify-between flex-wrap gap-1">
              <Link
                href="/"
                className="flex items-center gap-2 overflow-hidden"
              >
                <Image
                  src="/url-illustration.svg"
                  alt="URL Shortening Illustration"
                  width={32}
                  height={32}
                />
                <h1 className="text-xl font-bold">URLify</h1>
              </Link>
              <ModeToggle />
            </nav>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {/* <DropdownMenuItem onClick={handleClick}>
                  <span>Account</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
