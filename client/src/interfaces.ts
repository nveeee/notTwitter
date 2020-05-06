export interface UserInfo {
	id: number,
	nickname: string,
	bio: string,
	createdat: string,
	followers: number[] | null,
	likes: number[] | null,
	googleid: string
};

export interface Post {
	id: number,
	text: string,
	nickname: string,
	createdat: number,
	userid: number
};

export interface State {
	isSignedIn: boolean | null,
	userId: string | null,
	isLoading: boolean,
	userInfo: UserInfo | null,
	feed: Post[] | null,
	signIn?: (userId: string) => Promise<void>,
	signOut?: () => void,
	getFeed?: (userId: number) => Promise<void>,
	addPost?: (text: string, userId: number, nickname: string) => Promise<void>,
	deletePost?: (postId: number) => Promise<void>,
	toggleLike?: (userId: number, postId: number, isLiked: boolean | undefined) => Promise<void>,
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
	| { type: 'ADD_POST', payload: Post }
	| { type: 'DELETE_POST', payload: number }
	| { type: 'DELETE_LIKE', payload: number }
	| { type: 'ADD_LIKE', payload: number }
