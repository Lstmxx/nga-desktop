import AppBar from './app-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AppBar />
			<div className='flex bg-redwood-100'>
				<div className='grow'>{children}</div>
			</div>
		</>
	);
}
