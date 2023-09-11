import { apiHostConfig } from '@/config/host';
import { CustomResponse } from '@/lib/format-response';
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

interface Item {
	id?: string;
	name?: string;
	fid?: string;
	info?: string;
	content: Item[];
}

interface Data {
	data: {
		'0': {
			iconBase: string;
			all: Record<string, Item>;
		};
	};
}

const convert2List = (data: Record<string, Item>): Item[] => {
	const keys = Object.keys(data);
	const res: Item[] = [];
	keys.forEach((key) => {
		const target = data[key];
		let content: Item[] = [];
		if (target.content) {
			content = convert2List(target.content as unknown as Record<string, Item>);
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

	const jsText = await res.text();
	console.log('jstext', jsText);
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
		headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	});
};
