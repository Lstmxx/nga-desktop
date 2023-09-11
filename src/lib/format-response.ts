export type CustomResponse<T> = {
	data: T;
	message: string;
	success: boolean;
};

const formatToJson = async (response: Response) => {
	const contentType = response.headers.get('Content-Type') || '';
	const data: CustomResponse<any> = {
		data: {},
		success: true,
		message: '',
	};
	if (contentType.includes('application/json')) {
		Object.assign(data, await response.json());
	} else if (contentType.includes('form')) {
		const formData = await response.formData();
		for (const key of formData.keys()) {
			data.data[key] = formData.get(key);
		}
	}
	return data;
};

export async function handleResponse<T>(response: Response) {
	const data = (await formatToJson(response)) as CustomResponse<T>;
	console.log(data);
	if (!response.ok || !data.success) {
		const message = data.message || response.statusText || response.statusText;
		throw new Error(message);
	}

	return data;
}
