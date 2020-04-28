import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { GAPI_CLIENT_ID } from '../utils/config'
import GoogleSVG from '../utils/Google__G__Logo.svg'
import { SvgIcon, Button, CircularProgress, makeStyles, Theme, createStyles } from '@material-ui/core'

interface GoogleAuthProps {

}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		buttonStyles: {
			float: 'right'
		}
	})
);

const GoogleIcon = <SvgIcon component={GoogleSVG as React.ElementType<any>} viewBox="0 0 600 476.6" />;

const GoogleAuth: React.FC<GoogleAuthProps> = () => {
	const { isSignedIn, signIn, signOut, setLoading } = useContext(GlobalContext);
	const [auth, setAuth] = useState<gapi.auth2.GoogleAuth | undefined>();
	const classes = useStyles();

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
			<Button className={classes.buttonStyles} variant="contained" color="default" size="large" startIcon={GoogleIcon}><CircularProgress color="primary" size="1.5rem" /></Button>
		);
	} else if (isSignedIn) {
		return (
			<Button className={classes.buttonStyles} onClick={onSignOut} variant="contained" color="secondary" size="large" startIcon={GoogleIcon}>
				Sign Out
			</Button>
		);
	} else {
		return (
			<Button className={classes.buttonStyles} onClick={onSignIn} variant="contained" color="default" size="large" startIcon={GoogleIcon}>
				Sign In With Google
			</Button>
		);
	}
}

export default GoogleAuth
