import UpdateMenus from '@/components/plate/update-menus';
import getAll from '@/lib/api/plate/get-all';
import { IPlate } from '@/lib/api/plate/get-all/type';
import Plate from '../components/plate/index';

/**
 * 获取收藏版面
 */
const getFast = (data: IPlate[]) => {
	const fastIndex = data.findIndex((item) => item.id === 'fast');
	if (fastIndex !== -1) {
		return data.splice(fastIndex, 1)[0];
	}
};

export default async function Home() {
	const data = await getAll();
	const fast = getFast(data.list);
	return (
		<main className='flex min-h-screen flex-col items-center justify-between px-24 py-12'>
			<Plate plates={data.list} />
			<UpdateMenus plate={fast} />
		</main>
	);
}
