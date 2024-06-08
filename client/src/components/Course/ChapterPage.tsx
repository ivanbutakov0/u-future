import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Chip, Skeleton, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CourseContext, TCourseContext } from '../../pages/CoursePage'
import { RootState } from '../../redux/store'
import { setCurrentUser } from '../../redux/user/userSlice'
import { updateUser } from '../../services/UserService'
import VideoPlayer from '../VideoPlayer'

const ChapterPage = () => {
	const { course, isFetching } = useContext<TCourseContext>(CourseContext)
	const { chapterId } = useParams()

	const chapter = course.chapters?.find(chapter => chapter._id === chapterId)
	const user = useSelector((state: RootState) => state.user.currentUser)

	const dispatch = useDispatch()

	if (isFetching) {
		return <ChapterPage.Skeleton />
	}

	const handleEndedVideo = async () => {
		if (
			user?.finishedChapters.some(
				finishedChapter =>
					finishedChapter._id.toString() === chapter?._id.toString()
			)
		) {
			return
		}

		try {
			const response = await updateUser(user?._id!, {
				finishedChapters: [...user?.finishedChapters!, chapter!],
			})

			if (response.status !== 200) {
				console.log('Something went wrong')
				return
			}

			dispatch(setCurrentUser(response.data))
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	if (!user) {
		return (
			<Box
				component='div'
				sx={{
					backgroundColor: 'warning.main',
					px: 4,
					py: 2,
					mb: 3,
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<WarningAmberIcon />
				<Typography component='p' color='black'>
					Чтобы получить доступ к данной главе вам нужно приобрести курс.
				</Typography>
			</Box>
		)
	}

	if (
		user &&
		!chapter?.isFree &&
		!user.boughtCourses?.some(
			boughtCourse => boughtCourse._id.toString() === course._id.toString()
		)
	) {
		return (
			<Box
				component='div'
				sx={{
					backgroundColor: 'warning.main',
					px: 4,
					py: 2,
					mb: 3,
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<WarningAmberIcon />
				<Typography component='p' color='black'>
					Чтобы получить доступ к данной главе вам нужно приобрести курс.
				</Typography>
			</Box>
		)
	}

	return (
		<Box component={'section'}>
			<Typography variant='h4' component={'h2'} sx={{ mb: 2 }}>
				{chapter?.title}
			</Typography>
			<Typography variant='body1' component={'p'}>
				{chapter?.description}
			</Typography>
			{user?.finishedChapters.some(
				finishedChapter =>
					finishedChapter._id.toString() === chapter?._id.toString()
			) ? (
				<Chip label='Пройдено' color='success' sx={{ mt: 2 }} />
			) : (
				<Chip
					label='Не пройдено'
					color='error'
					sx={{ mt: 2 }}
					onClick={handleEndedVideo}
				/>
			)}

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
					<VideoPlayer url={chapter.videoUrl} onEnded={handleEndedVideo} />
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
