import { handleResponse } from '../../format-response';
import { encryptPassword } from '../../utils/encrypt';
import { ILoginForm, ILoginReq, ILoginRes } from './type';

const API = `${process.env.HOST}/api/auth/login`;

export default async function login(requestData: ILoginForm & { rid: string }) {
	const req: ILoginReq = {
		...requestData,
		__lib: 'login',
		__output: '',
		app_id: '5004',
		device: '',
		trackid: '',
		__act: 'login',
		__ngaClientChecksum: '',
		__inchst: 'UTF-8',
		prid: `P${(Math.random() + '').substring(2)}`,
		password: await encryptPassword(requestData.password),
	};
	const res = await fetch(API, {
		method: 'post',
		body: JSON.stringify(req),
	});

	const { data } = await handleResponse<ILoginRes>(res);

	return data;
}
