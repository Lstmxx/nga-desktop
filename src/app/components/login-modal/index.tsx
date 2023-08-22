'use client';
import { Button, Dialog, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export interface LoginDialogProps {
	open: boolean;
	onClose: () => void;
}
export default function LoginDialog(props: LoginDialogProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { open, onClose } = props;
	const handleClose = () => {
		onClose();
	};
	return (
		<Dialog onClose={handleClose} open={open}>
			<div className='bg-redwood-50 w-96 h-80 p-8'>
				<form>
					<TextField
						className='mt-6'
						size='small'
						fullWidth
						required
						type='text'
						label='账号'
						variant='outlined'
					/>
					<TextField
						className='mt-6'
						size='small'
						required
						fullWidth
						type='password'
						label='密码'
						variant='outlined'
					/>
					<Button
						className='mt-6 w-full'
						variant='contained'
						onClick={handleSubmit((data) => console.log(data))}
					>
						登录
					</Button>
				</form>
			</div>
		</Dialog>
	);
}
