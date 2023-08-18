import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function VerificationCode() {
	const [codeImage, setCodeImage] = useState('');
	const handleGetVerificationCode = async () => {
		const res = await fetch('http://localhost:3000/api/auth/verification-code', {
			method: 'get',
		});
		const codeImageUrl = URL.createObjectURL(await res.blob());
		setCodeImage(codeImageUrl);
	};

	useEffect(() => {
		handleGetVerificationCode();
	}, []);
	return (
		<div className='flex flex-col'>
			<Image src={codeImage} loading='lazy' alt={''} />
			<TextField size='small' required type='text' label='验证码' variant='outlined' />
		</div>
	);
}
