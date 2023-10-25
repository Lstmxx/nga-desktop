import { systemConfig } from '@/config/system';
import { handleResponse } from '@/lib/utils/format-response';
import { ISetCookiesReq } from './type';

const API = `${systemConfig.host}/api/auth/set-cookies`;

export default async function setCookies(requestData: ISetCookiesReq) {
	const res = await fetch(API, {
		method: 'post',
		body: JSON.stringify(requestData),
	});

	console.log('headers', res.headers);

	const { data } = await handleResponse<null>(res);

	console.log(data);

	return data;
}
