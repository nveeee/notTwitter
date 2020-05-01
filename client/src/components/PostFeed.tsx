import React from 'react'
import { Post } from '../interfaces'
import PostComponent from './PostComponent';

interface PostFeedProps {
	feed: Post[]
}

const PostFeed: React.FC<PostFeedProps> = ({ feed }) => {
	const renderContent = () => {
		return (
			<>
				{feed?.map(post => (
					<PostComponent key={post.id} post={post} />
				))}
			</>
		);
	};

	return (
		<>
			{renderContent()}
		</>
	)
}

export default PostFeed
