'use client';

import TextField from '@mui/material/TextField';

export default function form() {
	return (
		<>
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
		</>
	);
}
