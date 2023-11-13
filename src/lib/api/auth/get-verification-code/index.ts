import { systemConfig } from '@/config/system';
import { handleFetch } from '@/lib/utils/fetch';
import { IVerificationCodeRes } from './type';

const API = `${systemConfig.host}/api/auth/verification-code`;

export default async function getVerificationCode() {
	const from = 'login';
	const checkCodeId = `${from}${(Math.random() + '').substring(2)}`;
	const { data } = await handleFetch<IVerificationCodeRes>(API, {
		method: 'post',
		body: JSON.stringify({ from, checkCodeId }),
		headers: { 'Content-Type': 'application/json' },
	});
	const resJson = {
		imageUrl: '',
		checkCodeId,
	};

	if (data.image) {
		resJson.imageUrl = URL.createObjectURL(data.image);
	}

	return resJson;
}
