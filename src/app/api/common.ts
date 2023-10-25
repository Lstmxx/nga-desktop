import { NextResponse } from 'next/server';

export const jsTxt2Json = <T>(text: string): T => {
	try {
		const data = JSON.parse(text.split('script_muti_get_var_store=')[1]) as T;
		return data;
	} catch (error) {
		return {} as T;
	}
};

export async function http(req: {
	url: string;
	method: string;
	data?: Record<string, string>;
	formData?: FormData;
	options?: RequestInit;
}) {
	const controller = new AbortController();

	const timeoutId = setTimeout(
		() => {
			controller.abort();
		},
		10 * 60 * 1000
	);

	const fetchUrl = `${req.url}`;

	const fetchOptions: RequestInit = {
		...(req.options || {}),
		body: req.formData || JSON.stringify(req.data),
		method: req.method,
	};
	try {
		const res = await fetch(fetchUrl, fetchOptions);
		console.log('cookie', res.headers.get('Set-Cookie'));
		return new NextResponse(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: res.headers,
		});
	} catch (error) {
		return new NextResponse(JSON.stringify(error), {
			status: 500,
			statusText: 'error',
		});
	} finally {
		clearTimeout(timeoutId);
	}
}
