'use client';
import { ILoginForm } from '@/app/api/auth/login/type';
import { LOGIN_TYPE, LOGIN_TYPE_LIST } from '@/app/constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import VerificationCode from './verification-code';

export interface LoginDialogProps {
	open: boolean;
	onClose: () => void;
}

const createValidationSchema = () => {
	const validationSchema: Yup.ObjectSchema<ILoginForm> = Yup.object().shape({
		type: Yup.string()
			.required('类型不能为空')
			.oneOf(
				LOGIN_TYPE_LIST.map((item) => item.value),
				'请选择账号类型'
			),
		name: Yup.string()
			.required('账号不能为空')
			.when('type', (type, schema) => {
				console.log('name type', type);
				return (type[0] as LOGIN_TYPE) === LOGIN_TYPE.EMAIL ? schema.email('邮箱格式不对') : schema;
			}),
		password: Yup.string().required('密码不能为空'),
		captcha: Yup.string().required('验证码不能为空'),
	});
	return validationSchema;
};

export default function LoginDialog(props: LoginDialogProps) {
	const validationSchema = createValidationSchema();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		defaultValues: {
			type: LOGIN_TYPE.ACCOUNT,
			name: '',
			password: '',
			captcha: '',
		},
		resolver: yupResolver(validationSchema),
	});
	const { open, onClose } = props;
	const handleClose = () => {
		onClose();
	};

	const [codeImage, setCodeImage] = useState('');
	const handleGetVerificationCode = async () => {
		const res = await fetch('http://localhost:3000/api/auth/verification-code', {
			method: 'get',
		});
		if (res.status === 500) {
			console.log(res.body);
		} else if (res.status === 200) {
			const codeImageUrl = URL.createObjectURL(await res.blob());
			setCodeImage(codeImageUrl);
		}
	};

	useEffect(() => {
		if (props.open) {
			handleGetVerificationCode();
		}
	}, [props.open]);
	return (
		<Dialog onClose={handleClose} open={open}>
			<div className='bg-redwood-50 w-96 h-80 p-8'>
				<form>
					<div className='flex items-start  flex-nowrap'>
						<Controller
							control={control}
							name='type'
							render={({ field }) => (
								<FormControl className='w-[140px]' size='small'>
									<Select {...field}>
										{LOGIN_TYPE_LIST.map((item) => (
											<MenuItem value={item.value} key={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
						<Controller
							control={control}
							name='name'
							render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
								<TextField
									value={value}
									size='small'
									fullWidth
									required
									type='text'
									label=''
									variant='outlined'
									error={!!error?.message}
									helperText={error?.message}
									onBlur={onBlur}
									onChange={onChange}
								/>
							)}
						/>
					</div>
					<Controller
						control={control}
						name='password'
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								className='mt-6'
								size='small'
								required
								fullWidth
								type='password'
								label='密码'
								variant='outlined'
								error={!!error?.message}
								helperText={error?.message}
							/>
						)}
					/>
					<VerificationCode
						control={control}
						open={open}
						codeImage={codeImage}
						onReloadImage={handleGetVerificationCode}
					/>
					<Button
						className='mt-6 w-full'
						variant='contained'
						onClick={handleSubmit((data) => console.log(data))}
					>
						登录
					</Button>
				</form>
			</div>
		</Dialog>
	);
}
