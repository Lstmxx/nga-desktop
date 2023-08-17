const BASE_URL = 'https://ngabbs.com';

export async function http(req: {
	url: string;
	method: string;
	data?: Record<string, string>;
	options?: RequestInit;
}) {
	const controller = new AbortController();

	const timeoutId = setTimeout(
		() => {
			controller.abort();
		},
		10 * 60 * 1000
	);

	const fetchUrl = `${BASE_URL}${req.url}`;

	const fetchOptions: RequestInit = {
		...(req.options || {}),
		body: JSON.stringify(req.data),
		method: req.method,
	};
	console.log(fetchOptions);
	try {
		const res = await fetch(fetchUrl, fetchOptions);
		const headers = (fetchOptions.headers || {}) as Record<string, string>;
		Object.keys(headers).forEach((key) => {
			res.headers.set(key, headers[key]);
		});
		console.log([...res.headers.values()]);
		return res;
	} finally {
		clearTimeout(timeoutId);
	}
}
