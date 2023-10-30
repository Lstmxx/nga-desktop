import LoginDialog from '@/components/login-modal';
import { ILoginRes } from '@/lib/api/auth/login/type';
import { useUserStore } from '@/store/user';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';

const LoginButton = () => {
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
};

const UserInfo = ({ user }: { user: ILoginRes }) => {
	return (
		<div className='flex items-center'>
			<Avatar className='mr-2' src={user.avatar} />
			<div>{user.username}</div>
		</div>
	);
};

export default function Login() {
	const { user } = useUserStore();

	return user ? <UserInfo user={user} /> : <LoginButton />;
}
