'use client';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import Login from './login';
import RouterBar from './router-bar';

export type AppBarProps = {
  isOpenMenu: boolean;
  onMenuClick?: () => void;
};

export default function AppBar(props: AppBarProps) {
  return (
    <div className='flex fixed top-0 left-0 w-full z-50 items-center'>
      <IconButton onClick={props.onMenuClick}>
        {props.isOpenMenu ? (
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
