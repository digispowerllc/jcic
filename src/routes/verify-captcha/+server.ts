import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { token } = await request.json();

    const secret = 'YOUR_SECRET_KEY'; // Keep this safe

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret,
            response: token
        })
    });

    const data = await res.json();

    // Optional logging or alerts if needed
    console.log('reCAPTCHA verification result:', data);

    return json({
        success: data.success,
        score: data.score,
        action: data.action
    });
}
