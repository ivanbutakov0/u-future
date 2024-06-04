import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CourseContext, TCourseContext } from '../../pages/CoursePage'
import VideoPlayer from '../VideoPlayer'

const ChapterPage = () => {
	const { course, isFetching } = useContext<TCourseContext>(CourseContext)
	const { chapterId } = useParams()
	const chapter = course.chapters?.find(chapter => chapter._id === chapterId)

	if (isFetching) {
		return <ChapterPage.Skeleton />
	}

	return (
		<Box component={'section'}>
			<Typography variant='h4' component={'h2'} sx={{ mb: 2 }}>
				{chapter?.title}
			</Typography>
			<Typography variant='body1' component={'p'}>
				{chapter?.description}
			</Typography>
			<Box
				component='div'
				sx={{
					mt: 2,
					backgroundColor: '#e3e3e3',
					transition: 'all 0.3s ease',
					borderRadius: 2,
					height: 400,
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{chapter?.videoUrl ? (
					<VideoPlayer url={chapter.videoUrl} />
				) : (
					<Stack direction='row' alignItems='center' gap={1}>
						<VideocamOffIcon />
						<Typography>Нет видео</Typography>
					</Stack>
				)}
			</Box>
		</Box>
	)
}

ChapterPage.Skeleton = () => {
	return (
		<Box component={'section'}>
			<Skeleton
				variant='rectangular'
				width={'40%'}
				height={40}
				sx={{ mb: 2 }}
			/>
			<Skeleton variant='text' width={'80%'} sx={{ mb: 2 }} />
			<Skeleton variant='rectangular' width={'100%'} height={400} />
		</Box>
	)
}

export default ChapterPage
