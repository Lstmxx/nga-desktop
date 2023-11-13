import { handleResponse } from './format-response';

export const handleFetch = async <T>(...args: Parameters<typeof fetch>) => {
	const [input, init] = args;
	const response = await fetch(input, init);
	return handleResponse<T>(response);
};
