import ReactPlayer from 'react-player'

type VideoPlayerProps = {
	url: string
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
	return <ReactPlayer url={url} controls={true} width='100%' height='100%' />
}
export default VideoPlayer
