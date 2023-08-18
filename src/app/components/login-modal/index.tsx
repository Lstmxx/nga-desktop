'use client';
import { Button, Dialog } from '@mui/material';
import Form from './form';

export interface LoginDialogProps {
	open: boolean;
	onClose: () => void;
}
export default function LoginDialog(props: LoginDialogProps) {
	const { open, onClose } = props;
	const handleClose = () => {
		onClose();
	};
	return (
		<Dialog onClose={handleClose} open={open}>
			<div className='bg-redwood-50 w-96 h-80 p-8'>
				<Form />
				<Button className='mt-6 w-full' variant='contained' color='error' disabled={false}>
					登录
				</Button>
			</div>
		</Dialog>
	);
}
