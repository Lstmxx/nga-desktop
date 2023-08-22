import { LOGIN_TYPE } from '@/app/constant';

export type LoginForm = {
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
};

export interface LoginReq extends LoginForm {
	_lib: string;
	_output: string;
	app_id: string;
	device: string;
	trackid: string;
	_act: string;
	_ngaClientChecksum: string;
	__inchst: string;
	rid: string;
	captcha: string;
	prid: string;
}
