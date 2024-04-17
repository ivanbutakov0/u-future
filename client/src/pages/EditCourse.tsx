import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCourse } from '../services/CourseService'
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
		<div>
			<h1>Курс: {courseData?.title}</h1>
		</div>
	)
}
export default EditCourse
