import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryForm from '../components/EditCourse/Category/CategoryForm'
import DescForm from '../components/EditCourse/DescForm'
import ImageForm from '../components/EditCourse/ImageForm'
import PriceForm from '../components/EditCourse/PriceForm'
import TitleForm from '../components/EditCourse/TitleForm'
import TopicsForm from '../components/EditCourse/TopicsForm'
import { editCourseService, getCourse } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const EditCourse = () => {
	const params = useParams()
	const [courseData, setCourseData] = useState<CourseResponse | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCourse = async () => {
			const courseId = params.id

			try {
				const course = await getCourse(courseId!)
				if (!ignore) {
					setCourseData(course.data)
				}
			} catch (err) {
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
					<PriceForm initialData={courseData} setData={setCourseData} />
				</Stack>
			</Stack>
		</Box>
	)
}
export default EditCourse
