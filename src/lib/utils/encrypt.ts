'use client';

import type JSEncrypt from 'jsencrypt';

let encrypt: JSEncrypt;
const PUBLIC_KEY =
	'-----BEGIN PUBLIC KEY-----\n\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKzZWDimCN1OCprqWUhF\n\
UPhcwxDE62/BFVP6LtQHJu+65dm4YNmDvzitmcfaXW9YbhXnd4oP7j+6vpcgJQ+p\n\
3ucySo1ZnqO0Bb2JKEtxpCmxe7IYXhFEkJqHpFYBTiAxQz2n2mX4JZy/ehBUSMjz\n\
gzd0NdG6Ai1C42oCzYltUOjNWZUNHn1nqpElSWHnUWqkdN8+5ISP/ZMKiQdFANkE\n\
qDGw3/34qyF+E/hVgrGF4/CcWNP/LJCdB6DYtx7VPlQZF0tP1s+q/++rC4rQ2wmV\n\
l2V8zGh1j7ojZbt62hVjy6byK1E/2XYo97ZtL4KDW7F5jJMvSDRFR7901UR8hCdf\n\
4wIDAQAB\n\
-----END PUBLIC KEY-----';
const initEncrypt = async () => {
	const JSEncrypt = (await import('jsencrypt')).default;
	if (encrypt) {
		return encrypt;
	}
	encrypt = new JSEncrypt();
	encrypt.setPublicKey(PUBLIC_KEY);
	return encrypt;
};

export const encryptPassword = async (password: string) => {
	const e = await initEncrypt();
	return e.encrypt(password) || '';
};
