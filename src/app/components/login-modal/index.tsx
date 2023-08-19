'use client';
import { Button, Dialog, TextField } from '@mui/material';
import { Control, Controller, useForm } from 'react-hook-form';

type FormInputProps = {
	name: string;
	label: string;
	control: Control;
	className?: string;
};
const FormInput = ({ name, label, control, className }: FormInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<TextField
					className={className}
					helperText={error ? error.message : null}
					size='small'
					error={!!error}
					onChange={onChange}
					value={value}
					fullWidth
					label={label}
					variant='outlined'
					required
				/>
			)}
		/>
	);
};

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
					<FormInput className='mt-6' name='account' label='账号' control={control} />
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
						type='text'
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
