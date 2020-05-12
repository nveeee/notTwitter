import React, { useEffect, useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import { Post, UserInfo } from '../interfaces'
import ProfileInfo from './ProfileInfo'

type TParams = { id: string };
interface ProfileProps extends RouteComponentProps<TParams> {

}

const Profile: React.FC<ProfileProps> = ({ match: { params: { id } } }) => {
	const { getFeed, feed, getUserProfile } = useContext(GlobalContext);
	const [profileInfo, setProfileInfo] = useState<UserInfo | null>(null);
	
	useEffect(() => {
		(async () => {
			const res = await getUserProfile!(parseInt(id))
			setProfileInfo(res);
		})();
		getFeed!(parseInt(id), true);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (profileInfo) {
		return (
			<>
				<ProfileInfo profileInfo={profileInfo} />
				<PostForm />
				<PostFeed feed={feed as Post[]} />
			</>
		);
	} else {
		return (
			<>
				Loading...
			</>
		);
	}
	
}

export default Profile
