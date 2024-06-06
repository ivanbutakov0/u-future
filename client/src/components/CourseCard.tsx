import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CourseResponse } from '../types/response/CourseResponse'

type Props = {
	course: CourseResponse
}

const CourseCard = ({ course }: Props) => {
	const navigate = useNavigate()

	const handleCardClick = () => {
		navigate(`/courses/${course._id}/home`)
	}

	return (
		<Card sx={{ width: '260px' }}>
			<CardActionArea onClick={handleCardClick}>
				<CardMedia
					component='img'
					height='140'
					image={course.imageUrl}
					alt='course image'
				/>
				<CardContent>
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
					<Stack direction='row' spacing={1} alignItems='center' mt={2}>
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
						sx={{ textAlign: 'end', mt: 1, fontWeight: 'bold' }}
					>
						{course.price}₽
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default CourseCard
