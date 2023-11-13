'use client';

import { getCookie } from '../cookie';
import { handleResponse } from './format-response';

const handleSetCookies = async (headers: HeadersInit) => {
	const cookie = await getCookie();
	headers = Object.assign({}, headers, { cookie: cookie.join('') });
	return headers;
};

export const handleFetch = async <T>(...args: Parameters<typeof fetch>) => {
	let [input, init] = args;
	if (!init) {
		init = {};
	}
	init.headers = await handleSetCookies(init.headers || {});
	const response = await fetch(input, init);
	return handleResponse<T>(response);
};
