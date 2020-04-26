import React from 'react'
import { GlobalProvider } from '../context/GlobalState'
import Header from './Header'
import Controller from './Controller'
import '../app.css'
import { Grid } from '@material-ui/core'

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
				<Grid item xs={undefined} sm={2} />
				<Grid item xs={12} sm={8}>
					Content
				</Grid>
				<Grid item xs={undefined} sm={2} />
			</Grid>

		</Grid>
		</GlobalProvider>
	)
}

export default App
