import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const email = url.searchParams.get('email');
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  }

  const res = await fetch(`https://apinigeria.vercel.app/api/checkemail?email=${encodeURIComponent(email)}`);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
};
