export default async (req) => {
  const url = new URL(req.url);

  // Example: /api/news?endpoint=top-headlines&country=us
  const endpoint = url.searchParams.get("endpoint") || "top-headlines";

  const apiKey = process.env.NEWSAPI_KEY; // hidden on server
  if (!apiKey) {
    return new Response("Missing NEWSAPI_KEY", { status: 500 });
  }

  // Build upstream URL (adjust for your API)
  const upstream = new URL(`https://newsapi.org/v2/${endpoint}`);

  // Forward any other query params
  url.searchParams.forEach((value, key) => {
    if (key !== "endpoint") upstream.searchParams.set(key, value);
  });

  upstream.searchParams.set("apiKey", apiKey);

  const res = await fetch(upstream.toString());
  const body = await res.text();

  return new Response(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
      // optional: basic caching
      "cache-control": "public, max-age=60",
    },
  });
};
