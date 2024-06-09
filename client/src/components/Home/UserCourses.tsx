import { Link, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { RootState } from '../../redux/store'
import CourseCard from '../CourseCard'

const UserCourses = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)

	if (!user) {
		return
	}

	if (!user.boughtCourses.some(course => course.isPublished)) {
		return
	}

	return (
		<>
			<Typography variant='h4' component={'h1'} sx={{ mt: 4 }}>
				Ваши курсы
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
				{user?.boughtCourses.map(
					(course, index) =>
						course.isPublished && <CourseCard key={index} course={course} />
				)}
			</Stack>
		</>
	)
}
export default UserCourses
