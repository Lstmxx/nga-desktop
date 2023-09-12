export type MenuProps = {
	open: boolean;
};

export default function Menu({ open = false }: MenuProps) {
	return (
		<div
			className={`fixed transition-all left-0 top-1/2 -translate-y-1/2 shadow-redwood-200/50 h-96 w-52 bg-redwood-200 ${
				open ? '' : '-translate-x-full'
			}`}
		>
			<div className='h-96'>content</div>
		</div>
	);
}
