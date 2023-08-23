'use-client';

import { ILoginForm } from '@/app/api/auth/login/type';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { Control, Controller } from 'react-hook-form';

export default function VerificationCode(props: {
	control: Control<ILoginForm, any>;
	open: boolean;
	codeImage: string;
	onReloadImage: () => Promise<void>;
}) {
	return (
		<div className='flex flex-row'>
			<Image
				width={200}
				height={200}
				src={props.codeImage}
				loading='lazy'
				alt={''}
				onClick={props.onReloadImage}
			/>
			<Controller
				control={props.control}
				name='captcha'
				render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
					<TextField
						value={value}
						size='small'
						fullWidth
						required
						type='text'
						label='验证码'
						variant='outlined'
						error={!!error?.message}
						helperText={error?.message}
						onBlur={onBlur}
						onChange={onChange}
					/>
				)}
			/>
		</div>
	);
}
