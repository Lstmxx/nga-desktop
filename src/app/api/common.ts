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
		body: req.data ? JSON.stringify(req.data) : req.formData,
		method: req.method,
	};
	try {
		const res = await fetch(fetchUrl, fetchOptions);
		console.log([...res.headers.values()]);
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
