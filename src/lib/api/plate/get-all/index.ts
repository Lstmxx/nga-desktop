import { systemConfig } from '@/config/system';
import { handleResponse } from '@/lib/format-response';
import { IPlate } from './type';

const API = `${systemConfig.host}/api/plate/all`;

export default async function getAll() {
	const res = await fetch(`${API}?t=${Math.random()}`, {
		method: 'get',
	});
	const { data } = await handleResponse<{ list: IPlate[]; iconBase: string }>(res);

	return data;
}
