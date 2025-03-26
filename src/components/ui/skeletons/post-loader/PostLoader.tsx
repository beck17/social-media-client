import React from 'react'
import ContentLoader from 'react-content-loader'

const PostLoader = () => (
	<ContentLoader
		speed={2}
		width={720}
		height={700}
		viewBox="0 0 720 700"
		backgroundColor="#1d1d24"
		foregroundColor="#5e5e5e"
	>
		<circle cx="41" cy="40" r="20" />
		<rect x="80" y="21" rx="2" ry="2" width="140" height="13" />
		<rect x="80" y="40" rx="2" ry="2" width="60" height="10" />
		<rect x="20" y="85" rx="4" ry="4" width="720" height="15" />
		<rect x="13" y="120" rx="21" ry="21" width="720" height="700" />
	</ContentLoader>
)

export default PostLoader
