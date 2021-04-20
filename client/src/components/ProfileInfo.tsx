import React, { useContext, useState } from 'react'
import { UserInfo } from '../interfaces'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, TextField } from '@material-ui/core';
import headerImage from '../assets/defaultheader.jpg';
import { GlobalContext } from '../context/GlobalState';


interface ProfileInfoProps {
	profileInfo: UserInfo
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileInfo }) => {
	const { userInfo, toggleFollow } = useContext(GlobalContext);
	const [isActive, setIsActive] = useState(false);
	const [nickname, setNickname] = useState(profileInfo.nickname);
	const [bio, setBio] = useState(profileInfo.bio || 'This user has no bio');

	const handleToggleFollow = (isFollowed: boolean | undefined) => {
		toggleFollow!(userInfo?.id as number, profileInfo.id, isFollowed as boolean);
	};

	const handleToggleEdit = () => {
		if (isActive) {
			if (nickname.length < 1 || bio.length < 1) return;

			// Submit to backend
		}

		setIsActive(!isActive);
	};

	const renderFollowButton = () => {
		const isFollowed = userInfo?.followers?.includes(profileInfo.id);
		return (
		<Button onClick={() => handleToggleFollow(isFollowed)} size="small" color={isFollowed ? "secondary" : "primary"}>
			{isFollowed ? 'Unfollow' : 'Follow'}
		</Button>
		);
	};

	const renderEditButton = () => {
		return(
			<Button onClick={() => handleToggleEdit()} size="small" color="primary">
				{isActive ? 'Save Changes' : 'Edit Profile'}
			</Button>
		);
	};

	const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length <= 32) {
			setNickname(event.target.value);
		}
	};

	  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length <= 160) {
			setBio(event.target.value);
		}
	};

	const renderProfileInfo = () => {
		return(
			<>
				<CardMedia
					component="img"
					alt="User Header"
					height="140"
					image={headerImage}
					title={`${nickname}'s Header`}
				/>
				<CardContent>
					{isActive ? (
						<TextField
							variant="outlined"
							size="small"
							fullWidth
							value={nickname}
							onChange={handleNicknameChange}
						/>
					) : (
						<Typography gutterBottom variant="h5" component="h2">
							{nickname}
						</Typography>
					)}
					{isActive ? (
						<TextField
							multiline
							fullWidth
							rows={2}
							value={bio}
							onChange={handleBioChange}
							variant="outlined"
						/>
					) : (
						<Typography variant="body2" color="textSecondary" component="p">
							{bio}
						</Typography>
					)}
				</CardContent>
			</>
		);
	};

	return (
		<>
			<Card>
				{renderProfileInfo()}
				<CardActions>
					{profileInfo.id === userInfo?.id && (
						renderEditButton()
					)}
					{renderFollowButton()}
				</CardActions>
			</Card>
		</>
	)
}

export default ProfileInfo
