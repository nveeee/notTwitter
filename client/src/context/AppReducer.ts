import { State, Action } from '../interfaces'
import { SIGN_IN, SIGN_OUT, SET_LOADING } from './actionTypes'

export default (state: State, action: Action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null };
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		default:
			return state;
	}
};
