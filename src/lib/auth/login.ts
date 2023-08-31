import { LOGIN_TYPE } from '@/app/constant';
import { handleResponse } from '../format-response';
import { encryptPassword } from '../utils/encrypt';

export interface ILoginForm {
	/**
	 * 账号
	 */
	name: string;
	/**
	 * 账号类型
	 */
	type: LOGIN_TYPE;
	/**
	 * 密码
	 */
	password: string;
	/**
	 * 验证码
	 */
	captcha: string;
}

export interface ILoginReq extends ILoginForm {
	__lib: string;
	__output: string;
	app_id: string;
	device: string;
	trackid: string;
	__act: string;
	__ngaClientChecksum: string;
	__inchst: string;
	rid: string;
	prid: string;
}

const API = `${process.env.HOST}/api/auth/login`;

export default async function login(data: ILoginForm & { rid: string }) {
	const req: ILoginReq = {
		...data,
		__lib: 'login',
		__output: '',
		app_id: '5004',
		device: '',
		trackid: '',
		__act: 'login',
		__ngaClientChecksum: '',
		__inchst: 'UTF-8',
		prid: `P${(Math.random() + '').substring(2)}`,
		password: await encryptPassword(data.password),
	};
	const res = await fetch(API, {
		method: 'post',
		body: JSON.stringify(req),
	});

	const resData = await handleResponse(res);

	return resData;
}
