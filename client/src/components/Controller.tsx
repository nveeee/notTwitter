import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Content from './Content'
import LandingPage from './LandingPage'
import { Backdrop, CircularProgress, Paper } from '@material-ui/core'


interface ControllerProps {

}

const Controller: React.FC<ControllerProps> = () => {
	const { isSignedIn, isLoading } = useContext(GlobalContext);

	if (isSignedIn) return <Paper elevation={5}><Content /></Paper>;
	if (isSignedIn === false) return <LandingPage />;
	return (
		<>
			<LandingPage />
			<Backdrop open={isLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
}

export default Controller
