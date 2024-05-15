import { Box, Stack, Typography } from '@mui/material'
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
import { editCourseService, getCourse } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const EditCourse = () => {
	const params = useParams()
	const [courseData, setCourseData] = useState<CourseResponse | null>(null)
	const [isFetching, setIsFetching] = useState<boolean>(true)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const navigate = useNavigate()

	// TODO: create skeleton if isFetching

	useEffect(() => {
		const fetchCourse = async () => {
			setIsFetching(true)
			const courseId = params.id

			try {
				const course = await getCourse(courseId!)
				if (!ignore) {
					setCourseData(course.data)
				}
				setIsFetching(false)
			} catch (err) {
				setIsFetching(false)
				console.log('error', err)
				toast.error('Курс не найден')
				navigate('/')
			}
		}

		let ignore = false
		fetchCourse()
		return () => {
			ignore = true
		}
	}, [])

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

		if (!isFetching && courseUserId !== userId) {
			toast.error('Вы не можете редактировать этот курс')
			navigate('/')
		}
	}, [isFetching])

	return (
		<Box component='section' sx={{ pt: 4, pb: 4 }}>
			<Typography variant='h4' sx={{ mb: 6 }}>
				Редактирование курса
			</Typography>

			<Stack direction={{ sm: 'row', xs: 'column' }} spacing={4}>
				<Stack direction='column' spacing={2} sx={{ flex: 1 }}>
					<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
						Информация о курсе
					</Typography>
					<TitleForm initialData={courseData} setData={setCourseData} />
					<DescForm initialData={courseData} setData={setCourseData} />
					<ImageForm initialData={courseData} setData={setCourseData} />
					<CategoryForm initialData={courseData} setData={setCourseData} />
					<TopicsForm
						topics={courseData?.category?.allowedTopics}
						initialData={courseData}
						setData={setCourseData}
					/>
				</Stack>
				<Stack direction='column' spacing={2} sx={{ flex: 1 }}>
					<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
						Информация о видео
					</Typography>
					<ChaptersForm initialData={courseData} setData={setCourseData} />
					<PriceForm initialData={courseData} setData={setCourseData} />
				</Stack>
			</Stack>
		</Box>
	)
}
export default EditCourse
