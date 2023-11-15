import { store } from './store';

const KEY = 'cookies';

export const setCookie = (cookie: string) => {
	store.set(KEY, cookie);
};

export const getCookie = async () => {
	const cookie = await store.get(KEY);
	return (cookie || '') as string;
};
