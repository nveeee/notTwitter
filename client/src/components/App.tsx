import React from 'react'
import { GlobalProvider } from '../context/GlobalState'
import Header from './Header'
import Controller from './Controller'
import '../app.css'
import { Grid } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import Profile from './Profile'

interface AppProps {

}

const App: React.FC<AppProps> = () => {
	return (
		<GlobalProvider>
			<Grid container direction='column'>
			<Grid item>
				<Header />
			</Grid>

			<Grid item container>
				<Grid item xs={undefined} sm={2} md={3} />
				<Grid item xs={12} sm={8} md={6} >
					<Switch>
						<Route path="/users/:id" component={Profile} />
						<Route path="/" exact component={Controller} />
					</Switch>
				</Grid>
				<Grid item xs={undefined} sm={2} md={3} />
			</Grid>

		</Grid>
		</GlobalProvider>
	)
}

export default App
