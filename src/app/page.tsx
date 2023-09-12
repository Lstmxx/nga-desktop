import getAll from '@/lib/api/plate/get-all';
import Greet from './greet';

export default async function Home() {
	const data = await getAll();
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			{JSON.stringify(data)}
			<Greet></Greet>
		</main>
	);
}
