import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import { Post } from '../interfaces'

interface ContentProps {

}

const Content: React.FC<ContentProps> = () => {
	const { userInfo, feed, getFeed } = useContext(GlobalContext);

	useEffect(() => {
		if (userInfo) {
			getFeed!(userInfo!.id, false);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>	
			<PostForm />
			<PostFeed feed={feed as Post[]} />
		</>
		
	)
}

export default Content
