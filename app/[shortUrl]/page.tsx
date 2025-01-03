"use client";

import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export default function ShortUrlHandler({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const resolveUrl = async () => {
      const shortUrl = (await params).shortUrl;
      try {
        const res = await fetch(`api/longUrl/${shortUrl}`);
        if (res.ok) {
          const url = await res.json();
          window.location.href = url;
          return;
        }
        setError(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    resolveUrl();
  }, [params]);

  const style = "flex justify-center items-center text-6xl";

  if (loading)
    return (
      <div className={style}>
        <FadeLoader color="#ff7c03"  />
      </div>
    );
  if (error)
    return (
      <div className={style}>
        URL not found or expired
      </div>
    );

  return null;
}
