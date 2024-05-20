import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
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
			<Typography variant='h4' sx={{ mb: 6 }}>
				Редактирование главы курса
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
						Кастомизация главы
					</Typography>
					<TitleForm initialData={chapter} setData={setChapter} />
					<DescForm initialData={chapter} setData={setChapter} />
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
						Кастомизация видео
					</Typography>
					// TODO: create chapter video url form
				</Stack>
			</Stack>
		</Box>
	)
}
export default EditChapter
