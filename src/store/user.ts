import { ILoginRes } from '@/lib/api/auth/login/type';
import { store } from '@/lib/utils/store';
import { create } from 'zustand';

interface UserState {
	user: ILoginRes | null;
}

interface Action {
	updateUser: (user: ILoginRes) => void;
	initUser: () => Promise<void>;
}

const STORE_KEY = 'userInfo';

export const useUserStore = create<UserState & Action>()((set) => ({
	user: null,
	updateUser: (user: ILoginRes | null) => {
		store.set(STORE_KEY, user);
		set(() => ({ user }));
	},
	initUser: async () => {
		if (window) {
			console.log('window');
			const user = ((await store.get(STORE_KEY)) as ILoginRes) || null;
			set({ user });
		}
	},
}));
