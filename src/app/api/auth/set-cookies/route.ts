import { ISetCookiesReq, ISetCookiesRes } from '@/lib/api/auth/set-cookies/type';
import { CustomResponse } from '@/lib/utils/format-response';
import { NextRequest, NextResponse } from 'next/server';
import xmljs from 'xml-js';
import { http } from '../../common';

const headers = {
	Accept: '*/*',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	Origin: 'https://bbs.nga.cn',
	Pragma: 'no-cache',
	Referer: 'https://bbs.nga.cn/',
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

const hosts = ['https://nga.178.com/', 'https://ngabbs.com/', 'https://bbs.nga.cn/'];

export const POST = async (req: NextRequest) => {
	const query = (await req.json()) as ISetCookiesReq;
	const formData = new FormData();
	formData.set('uid', query.uid.toString());
	formData.set('cid', query.cid);

	const requests = hosts.map((host) => {
		const url = `${host}nuke.php?__lib=login&__act=login_set_cookie_quick&__output=9`;
		const options: RequestInit = {
			headers: Object.assign({}, headers, {
				Referer:
					host === 'https://bbs.nga.cn'
						? 'https://bbs.nga.cn/nuke.php?__lib=login&__act=account&login'
						: 'https://bbs.nga.cn/',
			}),
			referrer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
		};
		return http({
			url,
			method: 'post',
			options,
			formData,
		});
	});

	const resList = await Promise.all(requests);
	const resJson: CustomResponse<ISetCookiesRes> = {
		data: { cookies: [] },
		message: '',
		success: true,
	};
	try {
		if (
			resList.every(async (res) => {
				const text = await res.text();
				const data = JSON.parse(xmljs.xml2json(text, { compact: true }));
				console.log(data);
				return data['root']['data']['item'] !== 'SUCCESS';
			})
		) {
			resJson.message = '登录成功';
			const setCookies = resList[0].headers.getSetCookie();
			resJson.data.cookies = setCookies;
		}
	} catch (error) {
		resJson.success = false;
		resJson.message = '系统错误';
	}

	const newHeaders = new Headers();
	newHeaders.set('Content-Type', 'application/json');
	return new NextResponse(JSON.stringify(resJson), {
		status: 200,
		headers: newHeaders,
	});
};

export const dynamic = 'force-static';
