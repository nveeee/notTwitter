import React, { useContext } from 'react'
import { Post } from '../interfaces'
import { Card, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalState'

interface PostProps {
	post: Post
}

const useStyles = makeStyles({
	title: {
	  fontSize: 14,
	}
});

const PostComponent: React.FC<PostProps> = ({ post }) => {
	const { userInfo, deletePost } = useContext(GlobalContext);
	const classes = useStyles();

	const onDeleteClick = () => {
		deletePost!(post.id);
	};

	return (
		<Card>
			<CardContent>
				<Typography className={classes.title}>
					{post.nickname || "Default"}
				</Typography>
				<Typography variant="body2" component="p">
					{post.text}
				</Typography>
			</CardContent>

			<CardActions>
				{post.userid === userInfo?.id && <Button onClick={onDeleteClick} size="small" color="secondary">Delete NotTweet</Button>}
				<Button size="small">Like</Button>
			</CardActions>
		</Card>
	)
}

export default PostComponent
