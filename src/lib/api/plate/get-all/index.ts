import { systemConfig } from '@/config/system';
import { handleResponse } from '@/lib/format-response';

const API = `${systemConfig.host}/api/plate/all`;

export default async function getAll() {
	const res = await fetch(API, {
		method: 'get',
	});

	const { data } = await handleResponse<any>(res);

	return data;
}
