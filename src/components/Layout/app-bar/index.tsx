'use client';
import { useUserStore } from '@/store/user';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import Login from './login';
import Menu from './menu';
import RouterBar from './router-bar';

export default function AppBar() {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const { initUser } = useUserStore();
	const handleMenuClick = () => {
		setIsOpenMenu((pre) => !pre);
	};
	useEffect(() => {
		console.log(window);
		initUser();
	}, []);
	return (
		<div className='flex fixed top-0 left-0 w-full z-50 items-center bg-redwood-100 drop-shadow-sm'>
			<Menu open={isOpenMenu} />
			<IconButton onClick={handleMenuClick}>
				{isOpenMenu ? (
					<MenuOpenIcon className='text-redwood-600 cursor-pointer hover:text-redwood-600/50' />
				) : (
					<MenuIcon className='text-redwood-600 cursor-pointer hover:text-redwood-600/50' />
				)}
			</IconButton>
			<RouterBar></RouterBar>
			<Login></Login>
		</div>
	);
}
