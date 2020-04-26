import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Content from './Content'
import LandingPage from './LandingPage';


interface ControllerProps {

}

const Controller: React.FC<ControllerProps> = () => {
	const { isSignedIn, isLoading } = useContext(GlobalContext);

	if (isSignedIn) return <Content />;

	return (
		<>
			{/* <Dimmer active={isLoading}>
				<Loader size="massive"></Loader>
			</Dimmer>

			<LandingPage /> */}
		</>
	);
}

export default Controller
