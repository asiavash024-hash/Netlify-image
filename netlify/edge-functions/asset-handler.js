const BACKEND = (Netlify.env.get("BACKEND_API") || "").replace(/\/$/, "");

export default async function(request) {
  if (!BACKEND) return new Response("", { status: 500 });
  
  const url = new URL(request.url);
  const target = BACKEND + url.pathname.replace("/v/", "/") + url.search;
  
  return fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}
