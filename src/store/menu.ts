import { IPlate } from '@/lib/api/plate/get-all/type';
import { create } from 'zustand';

interface MenuState {
	menus: IPlate[];
}

interface Action {
	updateMenus: (menus: IPlate[]) => void;
}

export const useMenuStore = create<MenuState & Action>()((set) => ({
	menus: [],
	updateMenus: (menus: IPlate[]) => set(() => ({ menus })),
}));
