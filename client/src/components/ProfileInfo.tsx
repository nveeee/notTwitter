import React, { useContext } from 'react'
import { UserInfo } from '../interfaces'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import headerImage from '../assets/defaultheader.jpg';
import { GlobalContext } from '../context/GlobalState';


interface ProfileInfoProps {
	profileInfo: UserInfo
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileInfo }) => {
	const { userInfo, toggleFollow } = useContext(GlobalContext);

	const handleToggleFollow = (isFollowed: boolean | undefined) => {
		toggleFollow!(userInfo?.id as number, profileInfo.id, isFollowed as boolean);
	};

	const renderFollowButton = () => {
		const isFollowed = userInfo?.followers?.includes(profileInfo.id);
		return (
		<Button onClick={() => handleToggleFollow(isFollowed)} size="small" color={isFollowed ? "secondary" : "primary"}>
			{isFollowed ? 'Unfollow' : 'Follow'}
		</Button>
		);
	};

	return (
		<>
			<Card>
				<CardMedia
					component="img"
					alt="User Header"
					height="140"
					image={headerImage}
					title={`${profileInfo.nickname}'s Header`}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{profileInfo.nickname}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{profileInfo.bio || 'This user has no header'}
					</Typography>
				</CardContent>
				<CardActions>
					{profileInfo.id === userInfo?.id && (
						<Button size="small" color="primary">
							Edit Profile
						</Button>
					)}
					{renderFollowButton()}
				</CardActions>
			</Card>
		</>
	)
}

export default ProfileInfo
