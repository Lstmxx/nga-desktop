'use client';

import LoginDialog from '@/components/login-modal';
import { ILoginRes } from '@/lib/api/auth/login/type';
import { useUserStore } from '@/store/user';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
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
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const { updateUser } = useUserStore();
	const handleQuit = () => {
		updateUser(null);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>用户信息</MenuItem>
			<MenuItem onClick={handleQuit}>退出</MenuItem>
		</Menu>
	);
	return (
		<>
			<IconButton
				size='large'
				edge='end'
				aria-label='account of current user'
				aria-controls={menuId}
				aria-haspopup='true'
				disableFocusRipple
				disableRipple
				onClick={handleProfileMenuOpen}
			>
				<div className='flex items-center mr-2'>
					<Avatar sx={{ width: 24, height: 24 }} className='mr-2' src={user.avatar} />
					<div className=' text-sm'>{user.username}</div>
				</div>
			</IconButton>
			{renderMenu}
		</>
	);
};

export default function Login() {
	const { user } = useUserStore();

	return user ? <UserInfo user={user} /> : <LoginButton />;
}
