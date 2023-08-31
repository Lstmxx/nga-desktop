import { NextRequest, NextResponse } from 'next/server';
import { http } from '../../common';

const headers = {
	Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
	'Accept-Encoding': 'gzip, deflate, br',
	'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	Pragma: 'no-cache',
	'Sec-Fetch-Dest': 'image',
	'Sec-Fetch-Mode': 'no-cors',
	'Sec-Fetch-Site': 'same-origin',
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': 'Windows',
	Referer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
};

export const POST = async (req: NextRequest, params: any) => {
	const formData = await req.formData();
	console.log(formData);
	const query = await req.json();
	const url = `login_check_code.php?id=${query.checkCodeId}&from=${query.from}`;
	const options: RequestInit = {
		headers,
		referrer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
		referrerPolicy: 'unsafe-url',
	};
	const res = await http({
		url,
		method: 'get',
		options,
	});

	const resFormData = new FormData();
	resFormData.append('image', '');
	if (res.status === 500) {
		console.log(res.body);
	} else if (res.status === 200) {
		resFormData.set('image', await res.blob());
	}

	return new NextResponse(resFormData, {
		status: 200,
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};
