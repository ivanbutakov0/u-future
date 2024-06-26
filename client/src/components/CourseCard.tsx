import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'
import { CourseResponse } from '../types/response/CourseResponse'

type Props = {
	course: CourseResponse
}

const CourseCard = ({ course }: Props) => {
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user.currentUser)

	const handleCardClick = () => {
		navigate(`/courses/${course._id}/home`)
	}

	return (
		<Card sx={{ width: '260px' }}>
			<CardActionArea onClick={handleCardClick} sx={{ height: '100%' }}>
				<CardMedia
					component='img'
					height='140'
					image={course.imageUrl}
					alt='course image'
				/>
				<CardContent sx={{ height: '100%' }}>
					<Typography gutterBottom variant='body1' component='p'>
						{course.title.length > 40
							? course.title.slice(0, 40) + '...'
							: course.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{course.description && course.description.length > 85
							? course.description.slice(0, 85) + '...'
							: course.description}
					</Typography>
					<Stack
						direction='row'
						alignItems='center'
						mt={2}
						flexWrap={'wrap'}
						sx={{
							gap: 1,
							mb: 2,
						}}
					>
						{course?.topics?.map(topic => (
							<Chip
								label={topic.name}
								key={topic.name}
								variant='outlined'
								color='primary'
							/>
						))}
					</Stack>
					<Typography
						component='p'
						variant='h6'
						sx={{
							textAlign: 'end',
							mt: 1,
							fontWeight: 'bold',
							position: 'absolute',
							bottom: 5,
							right: 15,
						}}
					>
						{user &&
						user.boughtCourses.filter((boughtCourse: any) => {
							return boughtCourse._id.toString() === course._id.toString()
						}).length > 0
							? 'Куплено'
							: `${course.price}₽`}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default CourseCard
