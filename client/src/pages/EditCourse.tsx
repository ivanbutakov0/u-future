import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryForm from '../components/EditCourse/Category/CategoryForm'
import DescForm from '../components/EditCourse/DescForm'
import ImageForm from '../components/EditCourse/ImageForm'
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
		<Box component='section' sx={{ pt: 4, pb: 2 }}>
			<Typography variant='h4'>Редактирование курса</Typography>
			<Grid container spacing={4} sx={{ mt: 2 }}>
				<Grid item xs={12} md={6}>
					<TitleForm initialData={courseData} setData={setCourseData} />
				</Grid>
				<Grid item xs={12} md={6}>
					<DescForm initialData={courseData} setData={setCourseData} />
				</Grid>
				<Grid item xs={12} md={6}>
					<ImageForm initialData={courseData} setData={setCourseData} />
				</Grid>
				<Grid item xs={12} md={6}>
					<CategoryForm initialData={courseData} setData={setCourseData} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TopicsForm
						topics={courseData?.category?.allowedTopics}
						initialData={courseData}
						setData={setCourseData}
					/>
				</Grid>
			</Grid>
		</Box>
	)
}
export default EditCourse
