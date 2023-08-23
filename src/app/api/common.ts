const BASE_URL = 'https://bbs.nga.cn/';

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

	const fetchUrl = `${BASE_URL}${req.url}`;

	const fetchOptions: RequestInit = {
		...(req.options || {}),
		body: JSON.stringify(req.data),
		method: req.method,
	};
	try {
		const res = await fetch(fetchUrl, fetchOptions);
		return new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: res.headers,
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			status: 500,
			statusText: 'error',
		});
	} finally {
		clearTimeout(timeoutId);
	}
}
