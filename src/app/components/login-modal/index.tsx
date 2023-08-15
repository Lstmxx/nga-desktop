'use client';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

export interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function LoginDialog(props: LoginDialogProps) {
  const { open, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  const handleGetVerificationCode = async () => {
    // const data = await fetch('/api/auth/verification-code', { method: 'GET' });
    // console.log('VerificationCode', data);
  };

  useEffect(() => {
    if (open) {
      handleGetVerificationCode();
    }
  }, [open]);
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className='bg-redwood-50 w-96 h-80 p-8'>
        <h1 className='text-redwood-600'>登录</h1>
        <TextField
          className='mt-6 focus:border-redwood-600'
          size='small'
          fullWidth
          required
          type='text'
          label='账号'
          variant='outlined'
          placeholder='账号'
        />
        <TextField
          className='mt-6'
          size='small'
          required
          fullWidth
          type='text'
          label='密码'
          variant='outlined'
        />
        <div className='flex mt-6'>
          <TextField size='small' required type='text' label='验证码' variant='outlined' />
        </div>
      </div>
    </Dialog>
  );
}
