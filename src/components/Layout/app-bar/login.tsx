import LoginDialog from '@/components/login-modal';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Login() {
	const [open, setOpen] = useState(false);
	const handleOpenDialog = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button className='text-redwood-600' onClick={handleOpenDialog}>
				登录
			</Button>
			<LoginDialog open={open} onClose={handleClose} />
		</>
	);
}
