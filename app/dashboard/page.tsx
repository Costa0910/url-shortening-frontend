import ShortUrlHome from "@/components/ShortUrlHome";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TopUrls from "@/components/TopUrls";
import Link from "next/link";

export default function Dashboard() {
  let intl;
  if (Intl.DateTimeFormat) {
    intl = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* URL Shortening Form Section */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Create Short URL</CardTitle>
              <CardDescription>
                Paste your url and choose expiration date (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShortUrlHome withExpiration />
            </CardContent>
          </Card>
        </div>

        {/* Top URLs Section */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Top URLs</CardTitle>
            </CardHeader>
            <CardContent>
                <TopUrls />
            </CardContent>
            <CardFooter className="gap-2 justify-between">
              <p>
                Last updated:{" "}
                {intl?.format(new Date()) ?? new Date().toLocaleString()}
              </p>
                <Link href="/dashboard/links" className="hover:underline">View all</Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
