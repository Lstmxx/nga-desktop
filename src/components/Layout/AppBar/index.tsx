'use client';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RouterBar from './RouterBar';

export type AppBarProps = {
  isOpenMenu: boolean;
  isHoverMenuButton: boolean;
  onMenuClick?: () => void;
  onMouseHover?: (isHover: boolean) => void;
};

export default function AppBar(props: AppBarProps) {
  const handleMouseHover = (isHover = false) => {
    if (props.onMouseHover) {
      props.onMouseHover(isHover);
    }
    console.log('hover', isHover);
  };
  return (
    <div className='flex fixed top-0 left-0 w-full z-50 items-center px-4'>
      <IconButton
        onClick={props.onMenuClick}
        onMouseEnter={() => !props.isOpenMenu && handleMouseHover(true)}
        onMouseLeave={() => !props.isOpenMenu && handleMouseHover(false)}
      >
        {props.isOpenMenu || props.isHoverMenuButton ? (
          <MenuOpenIcon className='text-redwood-600 cursor-pointer hover:text-redwood-600/50' />
        ) : (
          <MenuIcon className='text-redwood-600 cursor-pointer hover:text-redwood-600/50' />
        )}
      </IconButton>
      <RouterBar></RouterBar>
      <Button className='text-redwood-600'>登录</Button>
    </div>
  );
}
