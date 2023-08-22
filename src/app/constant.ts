export enum LOGIN_TYPE {
	PHONE = 'phone',
	EMAIL = 'email',
	ID = 'id',
	ACCOUNT = ' ',
}

export const LOGIN_TYPE_LIST = [
	{ label: '手机号', value: LOGIN_TYPE.PHONE },
	{ label: '邮箱', value: LOGIN_TYPE.EMAIL },
	{ label: '账号ID', value: LOGIN_TYPE.ID },
	{ label: '账号', value: LOGIN_TYPE.ACCOUNT },
];
