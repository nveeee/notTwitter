import React, { createContext, useReducer } from 'react'
import { State, Children } from '../interfaces'
import AppReducer from './AppReducer'
import { SIGN_IN, SIGN_OUT, SET_LOADING, SERVER_ERROR } from './actionTypes'
import axios from 'axios'

const initialState: State = {
	isSignedIn: null,
	userId: null,
	isLoading: true,
	userInfo: null,
	feed: null
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

	const signIn = async (userId: string) => {
		try {
			const res = await axios.get('api/v1/nottwitter/user', {
				params: {
					googleId: userId,
					id: undefined,
					nickname: window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName()
				}
			});
	
			dispatch({
				type: SIGN_IN,
				payload: res.data.data
			});
		} catch (error) {
			dispatch({
				type: SERVER_ERROR,
				payload: error.response.data.error
			});
		}
	};

	const signOut = () => {
		dispatch({ type: SIGN_OUT })
	};

	const getFeed = async (userId: number) => {
		const res = await axios.get('api/v1/nottwitter/feed', {
			params: {
				id: userId
			}
		});

		if (res.data.data) {
			dispatch({
				type: 'SET_FEED',
				payload: res.data.data
			})
		}
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
				getFeed: getFeed,
				setLoading: setLoading
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
