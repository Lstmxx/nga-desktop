import { ILoginRes } from '@/lib/auth/login/type';
import { CustomResponse } from '@/lib/format-response';
import { NextRequest, NextResponse } from 'next/server';
import { http } from '../../common';

const URL = 'nuke.php';

const headers = {
	Accept: '*/*',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	Connection: 'keep-alive',
	Origin: 'https://bbs.nga.cn',
	Referer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
	'Content-Type': 'multipart/form-data;',
	'Sec-Fetch-Dest': 'empty',
	'Sec-Fetch-Mode': 'cors',
	'Sec-Fetch-Site': 'same-origin',
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'X-USER-AGENT':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"Windows"',
};

interface IError {
	'0': string;
}

interface IData {
	'0': string;
	'1': number;
	'2': string;
	'3': ILoginRes;
}

interface ILoginResponse {
	error?: IError;
	data?: IData;
	time: number;
}

export const POST = async (req: NextRequest) => {
	const requestData = await req.json();
	const data = new FormData();
	for (const key of Object.keys(requestData)) {
		data.set(key, requestData[key]);
	}
	const options: RequestInit = {
		headers,
		referrer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
		referrerPolicy: 'unsafe-url',
	};
	const res = await http({
		url: URL,
		method: 'post',
		options,
		formData: data,
	});

	const resJson: CustomResponse<null | ILoginRes> = {
		data: null,
		message: '',
		success: true,
	};
	try {
		const resString = await res.text();
		const data = JSON.parse(resString.split('script_muti_get_var_store=')[1]) as ILoginResponse;
		if (data.data) {
			resJson.data = data.data['3'];
		} else if (data.error) {
			resJson.message = data.error['0'];
			resJson.success = false;
		}
	} catch (error: any) {
		resJson.success = false;
		resJson.message = error.toString();
	}
	return new NextResponse(JSON.stringify(resJson), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const dynamic = 'force-static';
