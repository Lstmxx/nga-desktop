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
	_lib: string;
	_output: string;
	app_id: string;
	device: string;
	trackid: string;
	_act: string;
	_ngaClientChecksum: string;
	__inchst: string;
	rid: string;
	prid: string;
}
