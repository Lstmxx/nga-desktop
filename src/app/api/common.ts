import { NextRequest } from 'next/server';


const BASE_URL = 'https://ngabbs.com';

export async function http(req: NextRequest) {
  const controller = new AbortController();
  const authValue = req.headers.get("Authorization") ?? "";

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000);

  const fetchUrl = `${BASE_URL}${req.url}`;

  const headers = Object.assign({
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Authorization: authValue,
  }, req.headers);

  const fetchOptions: RequestInit = {
    headers,
    body: req.body,
    method: req.method,
  };

  try {
    const res = await fetch(fetchUrl, fetchOptions);
    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
      statusText: res.statusText,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}