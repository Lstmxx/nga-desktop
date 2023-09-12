'use client';

import { IPlate } from '@/lib/api/plate/get-all/type';
import { useMenuStore } from '@/store/menu';

type UpdateMenusProps = {
	plate: IPlate | undefined;
};

export default function UpdateMenus(props: UpdateMenusProps) {
	const updateMenus = useMenuStore((state) => state.updateMenus);
	updateMenus(props.plate ? props.plate.content : []);
	return null;
}
