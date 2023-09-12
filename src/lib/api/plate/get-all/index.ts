import { systemConfig } from '@/config/system';
import { handleResponse } from '@/lib/format-response';

const API = `${systemConfig.host}/api/plate/all`;

export default async function getAll() {
	const res = await fetch(`${API}?t=${Math.random()}`, {
		method: 'get',
	});
	console.log(res);
	const { data } = await handleResponse<any>(res);

	return data;
}
