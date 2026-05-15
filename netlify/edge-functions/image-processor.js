// به جایlay.js قبلی
const UPSTREAM = (Netlify.env.get("BACKEND_API") || "").replace(/\/$/, "");

export default async function(request, context) {
  if (!UPSTREAM) {
    return new Response("Not ready", { status: 500 });
  }

  await new Promise(r => setTimeout(r, Math.random() * 150 + 30));

  try {
    const url = new URL(request.url);
    const target = UPSTREAM + url.pathname.replace("/api/", "/") + url.search;
    
    const headers = new Headers(request.headers);
    headers.delete("x-nf-*");
    headers.set("x-edge-host", "render");

    const response = await fetch(target, {
      method: request.method,
      headers: headers,
      body: request.method !== "GET" ? request.body : undefined,
    });

    return response;
  } catch(e) {
    return new Response("", { status: 503 });
  }
}
