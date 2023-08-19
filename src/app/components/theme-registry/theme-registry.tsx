'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import GlobalCssPriority from './global-css-priority';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
	return (
		<GlobalCssPriority>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</GlobalCssPriority>
	);
}
