import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getTeacherCourses } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const MyCourses = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const [courses, setCourses] = useState<CourseResponse[]>([])

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const courses = await getTeacherCourses(user?._id!)
				setCourses(courses.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchCourses()
	}, [])

	return <div>MyCourses</div>
}
export default MyCourses
