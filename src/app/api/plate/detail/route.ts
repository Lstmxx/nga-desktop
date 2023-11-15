import { apiHostConfig } from '@/config/host';
import { IGetPlateDetailParams } from '@/lib/api/plate/get-plate-detail/type';
import { CustomResponse } from '@/lib/utils/fetch/format-response';
import { NextRequest, NextResponse } from 'next/server';
import { http } from '../../common';

const h = {
	Accept:
		'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	Pragma: 'no-cache',
	Referer: 'https://bbs.nga.cn/',
	'Sec-Fetch-Dest': 'document',
	'Sec-Fetch-Mode': 'navigate',
	'Sec-Fetch-Site': 'same-origin',
	'Sec-Fetch-User': '?1',
	'User-Agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
};

/**
 * page 分页
 * fid 板块id
 */
const API = `thread.php`;

export const POST = async (req: NextRequest) => {
	const headerList = req.headers;
	const { page, id, token } = (await req.json()) as IGetPlateDetailParams & { token: string };
	const url = `${apiHostConfig.nga}${API}?fid=${id}&page=${page || 1}`;
	console.log('url', url);
	console.log('req.headers', headerList);
	console.log('auth', token);
	const res = await http({
		url,
		method: 'get',
		options: { headers: Object.assign({}, h, { Cookie: token || '' }) },
	});
	const arrayBuffer = await res.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const decoder = new TextDecoder('gbk');
	const htmlText = decoder.decode(buffer);
	console.log(htmlText);
	const resJson: CustomResponse<null | any> = {
		data: htmlText,
		message: '',
		success: true,
	};

	return new NextResponse(JSON.stringify(resJson), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const dynamic = 'force-static';
export const runtime = 'nodejs';
export const revalidate = 'force-cache';
