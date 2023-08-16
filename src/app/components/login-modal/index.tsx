'use client';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

const getVerificationCode = async () => {
  const from = 'login';
  const checkCodeId = `${from}${(Math.random() + '').substring(2)}`;
  const res = await fetch(
    `https://ngabbs.com/login_check_code.php?id=${checkCodeId}&from=${from}`,
    {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Windows',
      },
      referrer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
      referrerPolicy: 'strict-origin',
    },
  );
  console.log('send');
  return res;
};

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
    const img = await getVerificationCode();
    console.log('VerificationCode', img);
  };

  useEffect(() => {
    if (open) {
      console.log('oh');
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
