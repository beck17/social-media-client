import CheckRole from '../../providers/auth-provider/CheckRole'

import Video from '../../components/screens/video'

const VideoPage = () => {
	return (
		<CheckRole>
			<Video />
		</CheckRole>
	)
}

export default VideoPage
