interface UserInfo {
	nickname: string,
	bio: string
};

interface Post {
	id: string,
	text: string,
	createdAt: number
};

export interface State {
	isSignedIn: boolean | null,
	userId: string | null,
	isLoading: boolean,
	userInfo: UserInfo,
	feed: Post[],
	signIn?: (userId: string) => void,
	signOut?: () => void,
	setLoading?: (bool: boolean) => void
};

export interface Children {
	children: React.ReactNode
};

export type Action =
	| { type: 'SIGN_IN', payload: string }
	| { type: 'SIGN_OUT' }
	| { type: 'SET_LOADING', payload: boolean };
