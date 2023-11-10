export const isEmail = (value: string) =>
	value.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

export const isPhone = (value: string) => value.match(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/);
