import React, { useRef } from 'react'

interface ContentProps {

}

const Content: React.FC<ContentProps> = () => {
	const segmentRef = useRef();

	return (
		<>
		{/* <Sidebar.Pushable as={Segment.Group}>
			<Sidebar
				as={Menu}
				vertical
				visible
				width="thin"
				target={segmentRef}
			>
				<Menu.Item as='a'>Home</Menu.Item>
				<Menu.Item as='a'>Games</Menu.Item>
				<Menu.Item as='a'>Channels</Menu.Item>
			</Sidebar>

			<Ref innerRef={segmentRef}>
				<Container>
					<Segment>
						Content
					</Segment>
				</Container>
			</Ref>
		</Sidebar.Pushable> */}
		</>
		
	)
}

export default Content
