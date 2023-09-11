import { LOGIN_TYPE } from '@/app/constant';

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

export interface ILoginRes {
	uid: number;
	username: string;
	avatar: string;
	token: string;
	bound_mobile: number;
	login_type: number;
}
