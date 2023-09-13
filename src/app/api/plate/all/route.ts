import { apiHostConfig } from '@/config/host';
import { IPlate } from '@/lib/api/plate/get-all/type';
import { CustomResponse } from '@/lib/utils/format-response';
import { NextResponse } from 'next/server';
import { http, jsTxt2Json } from '../../common';

const headers = {
	Accept: '*/*',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	Pragma: 'no-cache',
	Referer: 'https://bbs.nga.cn/',
	'Sec-Fetch-Dest': 'script',
	'Sec-Fetch-Mode': 'no-cors',
	'Sec-Fetch-Site': 'cross-site',
	'User-Agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
};

interface Data {
	data: {
		'0': {
			iconBase: string;
			all: Record<string, IPlate>;
		};
	};
}

const convert2List = (data: Record<string, IPlate>): IPlate[] => {
	const keys = Object.keys(data);
	const res: IPlate[] = [];
	keys.forEach((key) => {
		const target = data[key];
		let content: IPlate[] = [];
		if (target.content) {
			content = convert2List(target.content as unknown as Record<string, IPlate>);
		}
		res.push({ ...target, content });
	});
	return res;
};

export const GET = async () => {
	const options: RequestInit = {
		headers,
		referrer: 'https://bbs.nga.cn/',
		referrerPolicy: 'unsafe-url',
	};
	const __NOW = new Date().getTime();
	const url = `${apiHostConfig.img4}/proxy/cache_attach/bbs_index_data.js?7${Math.floor(
		__NOW / 7200
	)}`;
	const res = await http({
		url,
		method: 'get',
		options,
	});
	const arrayBuffer = await res.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const decoder = new TextDecoder('gbk');
	const jsText = decoder.decode(buffer);
	const data = jsTxt2Json<Data>(jsText);
	const { all, iconBase } = data.data[0];
	const resJson: CustomResponse<null | any> = {
		data: {
			list: convert2List(all),
			iconBase,
		},
		message: '',
		success: true,
	};

	return new NextResponse(JSON.stringify(resJson), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
