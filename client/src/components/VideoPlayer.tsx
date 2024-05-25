import ReactPlayer from 'react-player'

type VideoPlayerProps = {
	url: string
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
	return <ReactPlayer url={url} controls={true} width='400px' height='250px' />
}
export default VideoPlayer
