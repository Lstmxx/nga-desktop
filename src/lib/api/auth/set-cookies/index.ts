import { systemConfig } from '@/config/system';
import { setCookie } from '@/lib/utils/cookie';
import { handleFetch } from '@/lib/utils/fetch';
import { ISetCookiesReq, ISetCookiesRes } from './type';

const API = `${systemConfig.host}/api/auth/set-cookies`;

export default async function setCookies(requestData: ISetCookiesReq) {
	const { data } = await handleFetch<ISetCookiesRes>(API, {
		method: 'post',
		body: JSON.stringify(requestData),
	});
	const cookie = data.cookies.map((cookie) => cookie.split(';')[0]).join(';');
	console.log('cookie', cookie);
	setCookie(cookie);

	return null;
}
