'use client';

import { getCookie } from '../cookie';
import { handleResponse } from './format-response';

const handleSetCookies = async (headers: Headers, body: string) => {
	const cookie = await getCookie();
	headers.append('Authorization', cookie);
	console.log('cookie', cookie);
	return [headers, JSON.stringify({ ...JSON.parse(body || '{}'), token: cookie })];
};

export const handleFetch = async <T>(
	...args: [...Parameters<typeof fetch>, isSetCookie?: boolean]
) => {
	let [input, init, isSetCookie = false] = args;
	if (!init) {
		init = {};
	}
	if (isSetCookie) {
		[init.headers, init.body] = (await handleSetCookies(
			new Headers(init.headers || {}),
			(init.body as any) || '{}'
		)) as any;
	}
	const response = await fetch(input, init);
	return handleResponse<T>(response);
};
