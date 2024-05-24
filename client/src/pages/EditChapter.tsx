import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LockIcon from '@mui/icons-material/Lock'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import { Box, Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AccessForm from '../components/EditChapter/AccessFrom'
import DescForm from '../components/EditChapter/DescForm'
import TitleForm from '../components/EditChapter/TitleForm'
import { RootState } from '../redux/store'
import { editChapterService, getChapterById } from '../services/ChapterService'
import { TChapter } from '../types/TChapter'

const EditChapter = () => {
	const { courseId, chapterId } = useParams()
	const [chapter, setChapter] = useState<TChapter | null>(null)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const navigate = useNavigate()

	if (!user) {
		toast.error('Не авторизован')
		navigate('/')
	}

	useEffect(() => {
		const fetchChapter = async () => {
			try {
				const chapter = await getChapterById(chapterId!)
				setChapter(chapter.data)
			} catch (err) {
				console.log('error', err)
				toast.error('Глава не найдена')
				navigate('/')
			}
		}
		fetchChapter()
	}, [])

	useEffect(() => {
		const editChapter = async () => {
			try {
				if (chapter) {
					await editChapterService(chapter._id, chapter)
				}
			} catch (err) {
				console.log(err)
				toast.error('Произошла ошибка при редактировании главы')
			}
		}

		editChapter()
	}, [chapter])

	return (
		<Box component='section' sx={{ pt: 4, pb: 4 }}>
			<Link
				component={RouterLink}
				to={`/teachers/edit/${courseId}`}
				sx={{
					textDecoration: 'none',
					color: 'text.primary',
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					mb: 2,
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			>
				<ArrowBackIcon sx={{ width: '18px', height: '18px' }} />
				Вернуться к редактированию курса
			</Link>
			<Typography variant='h4' sx={{ mb: 6 }}>
				Редактирование главы
			</Typography>

			<Stack direction={{ sm: 'row', xs: 'column' }} spacing={4}>
				<Stack direction='column' spacing={2} sx={{ flex: 1 }}>
					<Typography
						variant='h6'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<AssignmentIcon />
						Кастомизация главы
					</Typography>
					<TitleForm initialData={chapter} setData={setChapter} />
					<DescForm initialData={chapter} setData={setChapter} />
					<Typography
						variant='h6'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<LockIcon />
						Настройка доступа
					</Typography>
					<AccessForm initialData={chapter} setData={setChapter} />
				</Stack>
				<Stack direction='column' spacing={2} sx={{ flex: 1 }}>
					<Typography
						variant='h6'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<VideoCallIcon />
						Кастомизация видео
					</Typography>
					// TODO: create chapter video url form
				</Stack>
			</Stack>
		</Box>
	)
}
export default EditChapter
