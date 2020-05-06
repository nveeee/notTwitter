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
	const { userInfo, deletePost, toggleLike } = useContext(GlobalContext);
	const classes = useStyles();
	const isLiked = userInfo?.likes?.includes(post.id);

	const onDeleteClick = () => {
		deletePost!(post.id);
	};

	const onLikeClick = (isLiked: boolean | undefined) => {
		toggleLike!(userInfo?.id!, post.id, isLiked);
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
				<Button onClick={() => onLikeClick(isLiked)} size="small" color={isLiked ? 'secondary' : 'primary'}>{isLiked ? 'Unlike' : 'Like'}</Button>
			</CardActions>
		</Card>
	)
}

export default PostComponent
