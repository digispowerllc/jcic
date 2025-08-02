// src/stores/recaptcha.ts
import { readable } from 'svelte/store';

export const recaptchaSiteKey = readable<string>(import.meta.env.VITE_RECAPTCHA_SITE_KEY);

