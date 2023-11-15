import { systemConfig } from '@/config/system';
import { handleFetch } from '@/lib/utils/fetch';
import { IGetPlateDetailParams } from './type';

const API = `${systemConfig.host}/api/plate/detail`;

export default async function getPlateDetail(params: IGetPlateDetailParams) {
	const { data } = await handleFetch<any>(
		API,
		{
			method: 'post',
			body: JSON.stringify(params),
		},
		true
	);

	return data;
}
