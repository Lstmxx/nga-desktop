import { ILoginRes } from '@/lib/api/auth/login/type';
import { CustomResponse } from '@/lib/utils/format-response';
import { NextRequest, NextResponse } from 'next/server';
import { http, jsTxt2Json } from '../../common';

import { apiHostConfig } from '@/config/host';

const URL = `${apiHostConfig.nga}nuke.php`;

const headers = {
	Accept: '*/*',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	Origin: 'https://bbs.nga.cn',
	Pragma: 'no-cache',
	Referer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
	'Sec-Fetch-Dest': 'empty',
	'Sec-Fetch-Mode': 'cors',
	'Sec-Fetch-Site': 'same-origin',
	'User-Agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'X-USER-AGENT':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
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
	console.log(requestData);
	const options: RequestInit = {
		headers: Object.assign({}, headers),
		referrer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
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
		const arrayBuffer = await res.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const decoder = new TextDecoder('gbk');
		const jsText = decoder.decode(buffer);
		console.log(jsText);
		const data = jsTxt2Json<ILoginResponse>(jsText);
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
