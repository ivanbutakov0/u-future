import { Box, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MyCoursesTable from '../components/MyCoursesTable'
import { RootState } from '../redux/store'
import { getTeacherCourses } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const MyCourses = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const isLoading = useSelector((state: RootState) => state.user.isLoading)
	const [courses, setCourses] = useState<CourseResponse[]>([])
	const [filteredCourses, setFilteredCourses] = useState<CourseResponse[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const courses = await getTeacherCourses(user?._id!)
				setCourses(courses.data)
			} catch (err) {
				console.log(err)
			}
		}

		if (!isLoading) {
			fetchCourses()
		}
	}, [isLoading])

	useEffect(() => {
		if (!searchQuery) {
			setFilteredCourses(courses)
		}

		const filteredCourses = courses.filter(course =>
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		setFilteredCourses(filteredCourses)
	}, [searchQuery])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchQuery(value)
	}

	return (
		<Box component='section' sx={{ pt: 4 }}>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Мои курсы
			</Typography>
			<TextField
				margin='normal'
				id='title'
				label='Поиск курса'
				size='small'
				sx={{ mb: 4 }}
				onChange={handleInputChange}
			/>
			{courses.length > 0 ? (
				<MyCoursesTable
					courses={filteredCourses.length > 0 ? filteredCourses : courses}
				/>
			) : (
				<MyCoursesTable.Skeleton />
			)}
		</Box>
	)
}
export default MyCourses
