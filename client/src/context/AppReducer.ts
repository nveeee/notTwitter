import { State, Action, Post } from '../interfaces'
import { SIGN_IN, SIGN_OUT, SET_LOADING, SET_FEED, ADD_POST, DELETE_POST } from './actionTypes'

export default (state: State, action: Action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload.googleid, userInfo: action.payload };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null, userInfo: null };
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_FEED:
			return { ...state, feed: action.payload };
		case ADD_POST:
			return { ...state, feed: [ action.payload, ...state.feed as Post[] ] };
		case DELETE_POST:
			return { ...state, feed: (state.feed as Post[]).filter(post => post.id !== action.payload) };
		default:
			return state;
	}
};
