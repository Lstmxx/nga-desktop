import { systemConfig } from '@/config/system';
import { handleFetch } from '@/lib/utils/fetch/server-fetch';
import { IPlate } from './type';

const API = `${systemConfig.host}/api/plate/all`;

export default async function getAll() {
	const { data } = await handleFetch<{ list: IPlate[]; iconBase: string }>(
		`${API}?t=${Math.random()}`,
		{
			method: 'get',
		}
	);

	return data;
}
