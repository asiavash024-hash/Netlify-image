const DEST = (Netlify.env.get("BACKEND_API") || "").replace(/\/$/, "");

export default async function(request) {
  if (!DEST) return new Response("", { status: 500 });
  
  const url = new URL(request.url);
  const target = DEST + url.pathname.replace("/content/", "/") + url.search;
  
  const res = await fetch(target, request);
  return res;
}
