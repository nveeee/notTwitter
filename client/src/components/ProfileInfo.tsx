import React from 'react'
import { UserInfo } from '../interfaces'

interface ProfileInfoProps {
	profileInfo: UserInfo
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileInfo }) => {
	console.log(profileInfo);
	return (
		<>
			<div>{profileInfo.nickname} - {profileInfo.bio}</div>
		</>
	)
}

export default ProfileInfo
