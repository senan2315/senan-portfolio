export function getApiBaseUrl() {
  // For client-side requests, use relative URLs
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For server-side during development, use the PORT env var
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}


