import { systemConfig } from '@/config/system';
import { handleFetch } from '@/lib/utils/fetch';
import { encryptPassword } from '../../../utils/encrypt';
import { ILoginForm, ILoginReq, ILoginRes } from './type';

const API = `${systemConfig.host}/api/auth/login`;

export default async function login(requestData: ILoginForm & { rid: string }) {
	const req: ILoginReq = {
		...requestData,
		__lib: 'login',
		__output: '1',
		app_id: '5004',
		device: '',
		trackid: '',
		__act: 'login',
		__ngaClientChecksum: '',
		__inchst: 'UTF-8',
		prid: `P${(Math.random() + '').substring(2)}`,
		password: await encryptPassword(requestData.password),
	};
	const { data } = await handleFetch<ILoginRes>(API, {
		method: 'post',
		body: JSON.stringify(req),
	});

	return data;
}
