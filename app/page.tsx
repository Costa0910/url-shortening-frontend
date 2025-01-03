import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import ShortUrlHome from "@/components/ShortUrlHome";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <div className="w-full border-b">
        <nav className="flex items-center justify-between py-2 max-w-6xl mx-auto px-4 xl:px-0">
          <div className="flex items-center gap-2">
            <Image
              src="/url-illustration.svg"
              alt="URL Shortening Illustration"
              width={32}
              height={32}
              priority
            />
            <h1 className="text-xl font-bold">URLify</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 xl:px-0">
        {/* Hero Section with Form */}
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-3 items-center py-4">
          {/* Form Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
             <div className="p-5 rounded-lg border bg-card shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Shorten URL</h2>
              <ShortUrlHome  withExpiration={false}/>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">No registration required for basic shortening.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <Link href="/register" className="underline hover:text-primary">
                    Create an account
                  </Link>
                  {" "}for expiration links and analytics.
                </p>
              </div>
            </div> 
          </div>

          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Transform Long URLs
              <br />
              Into Powerful Links
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Create short, impactful links that drive results. Perfect for
              social media, marketing campaigns, and professional sharing.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto w-full py-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <Image
                src="/url-illustration.svg"
                alt="URL Shortening Illustration"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </div>
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Lightning Fast Shortening
                </h3>
                <p className="text-muted-foreground">
                  Create short links instantly - no registration needed for
                  basic features
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Get powerful insights with real-time click tracking, location
                  data, and traffic sources
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Timed Links</h3>
                <p className="text-muted-foreground">
                  Set custom expiration dates for your links - perfect for
                  time-sensitive campaigns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
