import { Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { getCoursesByParentCategory } from '../../services/CourseService'
import { CourseResponse } from '../../types/response/CourseResponse'
import CourseCard from '../CourseCard'

type Props = {
	title: string
	category: string
}

const CourseGroup = ({ title, category }: Props) => {
	const [courses, setCourses] = useState<CourseResponse[]>([])
	const [isFetching, setIsFetching] = useState<boolean>(false)

	useEffect(() => {
		let cancelled = false

		const fetchCourses = async () => {
			setIsFetching(true)
			try {
				const response = await getCoursesByParentCategory(category, 5)

				if (response.status !== 200) {
					console.log('error', response)
				}

				if (!cancelled) {
					setCourses(response.data)
				}
			} catch (err) {
				console.log(err)
			} finally {
				setIsFetching(false)
			}
		}

		if (!cancelled) {
			fetchCourses()
		}

		return () => {
			cancelled = true
		}
	}, [])

	if (!courses.length && !isFetching) return

	return (
		<>
			<Typography variant='h4' component={'h1'} sx={{ mt: 4 }}>
				{title}
			</Typography>
			<Link
				component={RouterLink}
				color='inherit'
				to={'/courses'}
				sx={{ mt: 4 }}
			>
				Еще больше курсов в каталоге
			</Link>
			<Stack direction='row' flexWrap={'wrap'} sx={{ mt: 4, gap: 2 }}>
				{courses.map((course, index) => (
					<CourseCard key={index} course={course} />
				))}
			</Stack>
		</>
	)
}
export default CourseGroup
