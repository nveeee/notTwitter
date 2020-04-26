import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { GAPI_CLIENT_ID } from '../utils/config'

interface GoogleAuthProps {

}

const GoogleAuth: React.FC<GoogleAuthProps> = () => {
	const { isSignedIn, signIn, signOut, setLoading } = useContext(GlobalContext);
	const [auth, setAuth] = useState<gapi.auth2.GoogleAuth | undefined>();

	useEffect(() => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: GAPI_CLIENT_ID,
				scope: 'email'
			}).then(() => {
				setAuth(window.gapi.auth2.getAuthInstance());
				onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
				window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
			});
		})
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onAuthChange = (isSignedIn: boolean) => {
		if (isSignedIn) {
			signIn!(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
			setLoading!(false);
		} else {
			signOut!();
			setLoading!(false);
		}
	};

	const onSignIn = () => auth?.signIn();
	const onSignOut = () => auth?.signOut();

	if (isSignedIn === null) {
		return (
			<Button loading color="blue">Loading</Button>
		);
	} else if (isSignedIn) {
		return (
			<Button onClick={onSignOut} icon color="red">
				<Icon name="google" />
				Sign Out
			</Button>
		);
	} else {
		return (
			<Button onClick={onSignIn} icon color="blue">
				<Icon name="google" />
				Sign In With Google
			</Button>
		);
	}
}

export default GoogleAuth
