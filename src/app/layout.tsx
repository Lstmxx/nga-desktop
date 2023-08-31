import AlertProvider from '@/components/snackbar-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import ThemeRegistry from '../components/theme-registry/theme-registry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AlertProvider>
					<ThemeRegistry>
						<Layout>{children}</Layout>
					</ThemeRegistry>
				</AlertProvider>
			</body>
		</html>
	);
}
