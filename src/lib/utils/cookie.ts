import { store } from './store';

const KEY = 'cookies';

export const setCookie = (cookies: string[]) => {
	store.set(KEY, cookies);
};

export const getCookie = async () => {
	const cookies = await store.get(KEY);
	return (cookies || []) as string[];
};
