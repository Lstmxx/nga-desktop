import { StyledEngineProvider } from '@mui/material/styles';
import * as React from 'react';

export default function GlobalCssPriority({ children }: { children: React.ReactNode }) {
	return (
		<StyledEngineProvider injectFirst>
			{/* Your component tree. Now you can override Material UI's styles. */}
			{children}
		</StyledEngineProvider>
	);
}
