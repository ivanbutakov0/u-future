import ReactPlayer from 'react-player'

type VideoPlayerProps = {
	url: string
	onEnded?: () => void
}

const VideoPlayer = ({ url, onEnded }: VideoPlayerProps) => {
	return (
		<ReactPlayer
			url={url}
			controls={true}
			onEnded={onEnded}
			width='100%'
			height='100%'
		/>
	)
}
export default VideoPlayer
