import { systemConfig } from '@/config/system';
import { handleResponse } from '@/lib/utils/format-response';
import { IVerificationCodeRes } from './type';

const API = `${systemConfig.host}/api/auth/verification-code`;

export default async function getVerificationCode() {
	const from = 'login';
	const checkCodeId = `${from}${(Math.random() + '').substring(2)}`;
	console.log(process.env);
	console.log(API);
	const res = await fetch(API, {
		method: 'post',
		body: JSON.stringify({ from, checkCodeId }),
		headers: { 'Content-Type': 'application/json' },
	});
	const { data } = await handleResponse<IVerificationCodeRes>(res);
	const resJson = {
		imageUrl: '',
		checkCodeId,
	};

	if (data.image) {
		resJson.imageUrl = URL.createObjectURL(data.image);
	}

	return resJson;
}
