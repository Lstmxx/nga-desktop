import { ILoginRes } from '@/lib/api/auth/login/type';
import { create } from 'zustand';

interface UserState {
	user: ILoginRes | null;
}

interface Action {
	updateUser: (user: ILoginRes) => void;
}

export const useUserStore = create<UserState & Action>()((set) => ({
	user: null,
	updateUser: (user: ILoginRes | null) => set(() => ({ user })),
}));
