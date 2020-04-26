import React, { createContext, useReducer } from 'react'
import { State, Children } from '../interfaces'
import AppReducer from './AppReducer'
import { SIGN_IN, SIGN_OUT, SET_LOADING } from './actionTypes'

const initialState: State = {
	isSignedIn: null,
	userId: null,
	isLoading: true,
	userInfo: {
		nickname: 'user1name123',
		bio: 'Typical Twitter Bio of self absorbed asshole'
	},
	feed: [
		{ id: '1', text: 'SET STATE BACK TO NULL AFTER1', createdAt: Date.now() },
		{ id: '2', text: 'SET STATE BACK TO NULL AFTER2', createdAt: Date.now() },
		{ id: '3', text: 'SET STATE BACK TO NULL AFTER3', createdAt: Date.now() }
	]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: Children) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setLoading = (bool: boolean) => {
		dispatch({
			type: SET_LOADING,
			payload: bool
		})
	};

	const signIn = (userId: string) => {
		dispatch({
			type: SIGN_IN,
			payload: userId
		});
	};

	const signOut = () => {
		dispatch({ type: SIGN_OUT })
	};

	return (
		<GlobalContext.Provider
			value={{
				isSignedIn: state.isSignedIn,
				userId: state.userId,
				isLoading: state.isLoading,
				userInfo: state.userInfo,
				feed: state.feed,
				signIn: signIn,
				signOut: signOut,
				setLoading: setLoading
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
