'use client';
import { useState } from 'react';
import AppBar from './AppBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isHoverMenuButton, setIsHoverMenuButton] = useState(false);
  const handleMenuClick = () => {
    setIsOpenMenu((pre) => !pre);
    setIsHoverMenuButton(false);
  };
  return (
    <>
      <AppBar
        isOpenMenu={isOpenMenu}
        isHoverMenuButton={isHoverMenuButton}
        onMouseHover={setIsHoverMenuButton}
        onMenuClick={handleMenuClick}
      />
      <div className='flex'>
        <div className='grow'>{children}</div>
      </div>
    </>
  );
}
