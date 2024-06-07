import AssignmentIcon from '@mui/icons-material/Assignment'
import ChecklistIcon from '@mui/icons-material/Checklist'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryForm from '../components/EditCourse/Category/CategoryForm'
import ChaptersForm from '../components/EditCourse/Chapter/ChapterForm'
import DescForm from '../components/EditCourse/DescForm'
import ImageForm from '../components/EditCourse/ImageForm'
import PriceForm from '../components/EditCourse/PriceForm'
import TitleForm from '../components/EditCourse/TitleForm'
import TopicsForm from '../components/EditCourse/TopicsForm'
import { RootState } from '../redux/store'
import {
	deleteCourse,
	editCourseService,
	getCourse,
} from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const EditCourse = () => {
	const params = useParams()
	const [courseData, setCourseData] = useState<CourseResponse | null>(null)
	const [isFetching, setIsFetching] = useState<boolean>(true)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const isLoading = useSelector((state: RootState) => state.user.isLoading)
	const navigate = useNavigate()

	// Fetch course
	useEffect(() => {
		const fetchCourse = async () => {
			setIsFetching(true)
			const courseId = params.id

			try {
				const course = await getCourse(courseId!)

				setCourseData(course.data)
			} catch (err) {
				console.log('error', err)
				toast.error('Курс не найден')
				navigate('/')
			} finally {
				setIsFetching(false)
			}
		}

		fetchCourse()
	}, [])

	// Edit course if courseData has been changed
	useEffect(() => {
		const editCourse = async () => {
			try {
				if (courseData) {
					await editCourseService(courseData._id, courseData)
				}
			} catch (err) {
				console.log(err)
				toast.error('Произошла ошибка при редактировании курса')
			}
		}

		editCourse()
	}, [courseData])

	useEffect(() => {
		const courseUserId = courseData?.userId.toString()
		const userId = user?._id.toString()

		if (!isFetching && !isLoading && courseUserId && courseUserId !== userId) {
			if (!userId) {
				toast.error('Вы не авторизованы')
				navigate('/login')
				return
			}
			toast.error(
				'Вы не можете редактировать этот курс, т.к. он создан другим пользователем'
			)
			navigate('/')
		}
	}, [isFetching, courseData, user, isLoading])

	const publishClickHandler = async () => {
		if (
			!courseData?.title ||
			!courseData?.description ||
			!courseData?.imageUrl ||
			!courseData.price ||
			!courseData.category ||
			!courseData.topics ||
			!courseData.chapters
		) {
			toast.error('Заполните все обязательные поля')
			return
		}
		setCourseData({ ...courseData!, isPublished: !courseData?.isPublished })
	}

	const deleteCourseHandler = async () => {
		try {
			const response = await deleteCourse(courseData?._id!, user?._id!)

			if (response.status !== 200) {
				toast.error('Произошла ошибка при удалении курса')
				return
			}

			console.log(response)

			toast.success(`Курс «${response.data.title}» удален`)
			navigate(`/teachers/courses`)
		} catch (err) {
			console.log(err)
			toast.error('Произошла ошибка при удалении курса')
		}
	}

	return (
		<Box component='section' sx={{ pt: 4, pb: 4 }}>
			{courseData && !courseData?.isPublished && (
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
						Данная глава еще не опубликована.
					</Typography>
				</Box>
			)}

			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				spacing={2}
				sx={{ mb: 6 }}
			>
				<Typography variant='h4' sx={{ mb: 6 }}>
					Редактирование курса
				</Typography>
				<Box component='div' sx={{ display: 'flex', gap: 1 }}>
					<Button
						type='button'
						variant='outlined'
						size='small'
						color='primary'
						onClick={publishClickHandler}
					>
						{courseData?.isPublished ? 'Снять с публикации' : 'Опубликовать'}
					</Button>
					<Button
						type='button'
						variant='outlined'
						size='small'
						color='error'
						onClick={deleteCourseHandler}
					>
						Удалить
					</Button>
				</Box>
			</Stack>

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
						Настройка курса
					</Typography>

					{isFetching && <TitleForm.Skeleton />}
					{courseData && (
						<TitleForm initialData={courseData} setData={setCourseData} />
					)}

					{isFetching && <DescForm.Skeleton />}
					{courseData && (
						<DescForm initialData={courseData} setData={setCourseData} />
					)}

					{isFetching && <ImageForm.Skeleton />}
					{courseData && (
						<ImageForm initialData={courseData} setData={setCourseData} />
					)}

					{isFetching && <CategoryForm.Skeleton />}
					{courseData && (
						<CategoryForm initialData={courseData} setData={setCourseData} />
					)}

					{isFetching && <TopicsForm.Skeleton />}
					{courseData && (
						<TopicsForm
							topics={courseData?.category?.allowedTopics}
							initialData={courseData}
							setData={setCourseData}
						/>
					)}
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
						<ChecklistIcon />
						Настройка глав
					</Typography>

					{isFetching && <ChaptersForm.Skeleton />}
					{courseData && (
						<ChaptersForm initialData={courseData} setData={setCourseData} />
					)}

					<Typography
						variant='h6'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<MonetizationOnIcon />
						Настройка цены
					</Typography>

					{isFetching && <PriceForm.Skeleton />}
					{courseData && (
						<PriceForm initialData={courseData} setData={setCourseData} />
					)}
				</Stack>
			</Stack>
		</Box>
	)
}
export default EditCourse
