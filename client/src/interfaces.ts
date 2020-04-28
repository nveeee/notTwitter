interface UserInfo {
	id: number,
	nickname: string,
	bio: string,
	createdat: string,
	followers: number[] | null,
	googleid: string
};

interface Post {
	id: string,
	text: string,
	createdat: number
};

export interface State {
	isSignedIn: boolean | null,
	userId: string | null,
	isLoading: boolean,
	userInfo: UserInfo | null,
	feed: Post[] | null,
	signIn?: (userId: string) => void,
	signOut?: () => void,
	getFeed?: (userId: number) => void,
	setLoading?: (bool: boolean) => void
};

export interface Children {
	children: React.ReactNode
};

export type Action =
	| { type: 'SIGN_IN', payload: UserInfo }
	| { type: 'SIGN_OUT' }
	| { type: 'SET_LOADING', payload: boolean }
	| { type: 'SERVER_ERROR', payload: any }
	| { type: 'SET_FEED', payload: Post[] }
