import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CourseResponse } from '../../types/response/CourseResponse'

type Props = {
	course: CourseResponse
}

const CourseCard = ({ course }: Props) => {
	const navigate = useNavigate()
	const handleCardClick = () => {
		navigate(`/courses/${course._id}/home`)
	}
	return (
		<Card sx={{ maxWidth: 260 }}>
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
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default CourseCard
