'use client';
import { useState } from 'react';
import AppBar from './app-bar';
import Menu from './menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleMenuClick = () => {
    setIsOpenMenu((pre) => !pre);
  };
  return (
    <>
      <AppBar isOpenMenu={isOpenMenu} onMenuClick={handleMenuClick} />
      <Menu isOpenMenu={isOpenMenu} />
      <div className='flex bg-redwood-100'>
        <div className='grow'>{children}</div>
      </div>
    </>
  );
}
