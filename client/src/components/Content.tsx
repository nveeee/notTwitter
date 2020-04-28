import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { TextField, Grid, Button, makeStyles, Theme, createStyles, Avatar, CircularProgress, Typography } from '@material-ui/core'
import useWindowDimensions from '../hooks/useWindowDimensions'

interface ContentProps {

}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatarStyles: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginLeft: '10%',
			marginTop: '10%'
		},
		loaderStyles: {

		}
	})
);

const constrainNumbers = (number: number, max: number) => {
	if (number > max) return 100;
	return number;
};

const Content: React.FC<ContentProps> = () => {
	const { userInfo, feed, getFeed } = useContext(GlobalContext);
	const [values, setValues] = useState('');
	const [characters, setCharacters] = useState(280);
	const classes = useStyles();
	const { width } = useWindowDimensions();

	useEffect(() => {
		if (userInfo) {
			getFeed!(userInfo!.id);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (values.length > 280) return;

		// Do API stuff...

		setValues('');
	};

	const onChange = (e: any) => {
		e.preventDefault();
		setValues(e.target.value);
		setCharacters(280 - (e.target.value.length));
	};

	return (
		<>	
			<Grid container>
				<Grid item xs={undefined} sm={2} hidden={width < 600 ? true : false} >
					<Avatar className={classes.avatarStyles}>{userInfo?.nickname[0] || '?'}</Avatar>
				</Grid>

				<Grid item xs={12} sm={10}>
					<TextField
						id="standard-multiline-static"
						multiline
						rows={5}
						placeholder="What's going on?"
						fullWidth
						value={values}
						error={values.length > 280 ? true : false}
						helperText={values.length > 280 ? "Not Tweet too long!" : " "}
						onChange={onChange}
					/>
				{/* <div style={{ display: 'table', width: '100%' }}>
					<div className="d-table-cell loader">
						<CircularProgress color={((values.length / 280) * 100) >= 100 ? 'secondary' : 'primary'} className="d-table-cell" size="2rem" variant="static" value={constrainNumbers(Math.ceil(((values.length / 280) * 100)), 100)} />
						<Typography color={characters < 0 ? 'error' : 'primary'} variant="subtitle1" gutterBottom>
							{characters < 50 ? characters : ''}
						</Typography>
					</div>
					
					<div className="d-table-cell twtbtn">
						
						<Button
							variant="outlined"
							disabled={values ? false : true}
							color="inherit"
							onClick={onSubmit}
						>
							not Tweet
						</Button>
					</div>
				</div> */}

				<div className="bottom-flex">
					<div className="loader">
						<CircularProgress color={((values.length / 280) * 100) >= 100 ? 'secondary' : 'primary'} className="d-table-cell" size="2rem" variant="static" value={constrainNumbers(Math.ceil(((values.length / 280) * 100)), 100)} />
					</div>

					<Typography color={characters < 0 ? 'error' : 'primary'} variant="subtitle1" gutterBottom>
						{characters < 50 ? characters : ''}
					</Typography>

					<div className="twtbtn">
						<Button
							variant="outlined"
							disabled={values ? false : true}
							color="inherit"
							onClick={onSubmit}
						>
							not Tweet
						</Button>
					</div>
					
				</div>
				</Grid>
			</Grid>

			
			
			
			{feed?.map(post => (<div key={post.id}>{post.id} - {post.text} - {post.createdat}</div>))}
		</>
		
	)
}

export default Content
