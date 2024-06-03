import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material'
import { CourseResponse } from '../../types/response/CourseResponse'

type Props = {
	course: CourseResponse
}

const CourseCard = ({ course }: Props) => {
	return (
		<Card sx={{ maxWidth: 260 }}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='140'
					image={course.imageUrl}
					alt='course image'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{course.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{course.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default CourseCard
