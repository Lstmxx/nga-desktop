'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RouterButton() {
	const router = useRouter();
	const handleClick = () => {
		router.back();
	};
	return <Button onClick={handleClick}>back</Button>;
}
