import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DescForm from '../components/EditCourse/DescForm'
import ImageForm from '../components/EditCourse/ImageForm'
import TitleForm from '../components/EditCourse/TitleForm'
import { getCourse } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const EditCourse = () => {
	const params = useParams()
	const [courseData, setCourseData] = useState<CourseResponse>({
		id: '',
		title: '',
		userId: '',
		isPublished: false,
		description: '',
		imageUrl: '',
		createdAt: '',
		updatedAt: '',
	})
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCourse = async () => {
			const courseId = params.id
			try {
				const course = await getCourse(courseId!)
				setCourseData(course.data)
			} catch (err) {
				console.log(err)
				toast.error('Курс не найден')
				navigate('/')
			}
		}

		fetchCourse()
	}, [])

	return (
		<Box component='section' sx={{ pt: 4 }}>
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
			</Grid>
		</Box>
	)
}
export default EditCourse
