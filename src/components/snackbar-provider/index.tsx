import { SnackbarProvider } from './notistack';

export default function AlertProvider({ children }: { children: React.ReactNode }) {
	return (
		<SnackbarProvider
			maxSnack={1}
			autoHideDuration={3000}
			anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
		>
			{children}
		</SnackbarProvider>
	);
}
