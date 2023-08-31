const formatToJson = async (response: Response) => {
	const contentType = response.headers.get('Content-Type') || '';
	const data: any = {};
	if (contentType.includes('application/json')) {
		Object.assign(data, await response.json());
	} else if (contentType.includes('multipart/form-data')) {
		const formData = await response.formData();
		for (const key of formData.keys()) {
			data[key] = formData.get(key);
		}
	}
	return data;
};

export async function handleResponse<T>(response: Response): Promise<T> {
	const data = await formatToJson(response);

	if (!response.ok) {
		const message = (data.message as string) || response.statusText || response.statusText;
		throw new Error(message);
	}

	return data as T;
}
