'use client';
import { LOGIN_TYPE, LOGIN_TYPE_LIST } from '@/app/constant';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Dialog,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import VerificationCode from './verification-code';

import { useSnackbar } from '@/components/snackbar-provider/notistack';
import getVerificationCode from '@/lib/api/auth/get-verification-code';
import login from '@/lib/api/auth/login';
import { ILoginForm } from '@/lib/api/auth/login/type';
import setCookies from '@/lib/api/auth/set-cookies';
import { isEmail, isPhone } from '@/lib/utils/is';
import { useUserStore } from '@/store/user';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

export interface LoginDialogProps {
	open: boolean;
	onClose: () => void;
}

const createValidationSchema = () => {
	const validatorName: Record<
		LOGIN_TYPE,
		(schema: Yup.StringSchema<string, Yup.AnyObject, undefined, ''>) => any
	> = {
		[LOGIN_TYPE.EMAIL]: (schema) => schema.email('邮箱格式不对'),
		[LOGIN_TYPE.PHONE]: (schema) =>
			schema.matches(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, { message: '手机号格式不对' }),
		[LOGIN_TYPE.ID]: (schema) => schema.required('id不能为空'),
		[LOGIN_TYPE.ACCOUNT]: (schema) => schema.required('账号不能为空'),
	};

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
				const fn = validatorName[type[0] as LOGIN_TYPE];
				return fn ? fn(schema) : schema;
			}),
		password: Yup.string().required('密码不能为空'),
		captcha: Yup.string().required('验证码不能为空'),
	});
	return validationSchema;
};

export default function LoginDialog(props: LoginDialogProps) {
	const { enqueueSnackbar } = useSnackbar();
	const { updateUser } = useUserStore();
	const validationSchema = createValidationSchema();
	const { control, handleSubmit, formState, watch, setValue } = useForm<ILoginForm>({
		mode: 'onChange',
		defaultValues: {
			type: LOGIN_TYPE.ACCOUNT,
			name: '',
			password: '',
			captcha: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const watchFields = watch();
	useEffect(() => {
		if (watchFields.type !== LOGIN_TYPE.EMAIL && isEmail(watchFields.name)) {
			setValue('type', LOGIN_TYPE.EMAIL);
		} else if (watchFields.type !== LOGIN_TYPE.PHONE && isPhone(watchFields.name)) {
			setValue('type', LOGIN_TYPE.PHONE);
		}
	}, [setValue, watchFields]);

	const { open, onClose } = props;
	const handleClose = () => {
		onClose();
	};

	const checkCodeId = useRef('');
	const [codeImage, setCodeImage] = useState('');
	const handleGetVerificationCode = async () => {
		try {
			const res = await getVerificationCode();
			checkCodeId.current = res.checkCodeId;
			setCodeImage(res.imageUrl);
		} catch (error) {
			console.log(error);
			enqueueSnackbar('获取验证码失败', { variant: 'error' });
		}
	};

	const handleLogin = async (data: ILoginForm) => {
		try {
			const res = await login({ ...data, rid: checkCodeId.current });
			enqueueSnackbar('登录成功', { variant: 'success' });
			console.log(res);
			await setCookies({ uid: res.uid, cid: res.token });
			updateUser(res);
			handleClose();
		} catch (error: any) {
			enqueueSnackbar(error, { variant: 'error' });
			handleGetVerificationCode();
			console.log(error);
		}
	};

	useEffect(() => {
		if (props.open) {
			handleGetVerificationCode();
		}
	}, [props.open]);
	return (
		<Dialog onClose={handleClose} open={open} fullScreen={true}>
			<div className='relative bg-redwood-50 flex items-center justify-center w-full h-full p-8'>
				<IconButton className=' absolute left-0 top-0' onClick={handleClose}>
					<ArrowBackIcon />
				</IconButton>
				<form className='flex-col w-72'>
					<Image
						className='w-full h-full'
						width={0}
						height={0}
						src='/logo.svg'
						loading='lazy'
						alt={''}
						objectFit='contain'
					/>
					<div className='flex items-start flex-nowrap h-[65px] mt-6'>
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
					<div className='h-[65px]'>
						<Controller
							control={control}
							name='password'
							render={({ field, fieldState: { error } }) => (
								<TextField
									{...field}
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
					</div>
					<VerificationCode
						control={control}
						open={open}
						codeImage={codeImage}
						onReloadImage={handleGetVerificationCode}
					/>
					<Button
						className='w-full mt-2'
						variant='contained'
						onClick={handleSubmit((data) => handleLogin(data))}
					>
						登录
					</Button>
				</form>
			</div>
		</Dialog>
	);
}
