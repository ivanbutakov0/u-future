import { Box, Button, Chip, Skeleton, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { CourseContext, TCourseContext } from '../../pages/CoursePage'

const CourseHome = () => {
	const { course, isFetching } = useContext<TCourseContext>(CourseContext)

	if (isFetching) {
		return <CourseHome.Skeleton />
	}

	return (
		<Box component='section'>
			<img
				src={course.imageUrl}
				alt={course.title}
				style={{ width: '100%', height: '300px', objectFit: 'contain' }}
			/>

			<Stack
				direction={'column'}
				spacing={2}
				justifyContent={'center'}
				sx={{ py: 2 }}
			>
				<Typography component={'h2'} variant='h5' sx={{ fontWeight: 'bold' }}>
					{course.title}
				</Typography>
				<Typography component={'p'}>{course.description}</Typography>
			</Stack>
			<Typography
				component='p'
				variant='body1'
				sx={{ fontWeight: 'bold', mb: 2, textTransform: 'capitalize' }}
			>
				Категория: {course.category?.name}
			</Typography>
			<Stack direction={'row'} spacing={1} flexWrap={'wrap'} sx={{ mb: 2 }}>
				{course.topics?.map(topic => (
					<Chip key={topic.name} label={topic.name} color='primary' />
				))}
			</Stack>

			<Stack
				direction={'row'}
				spacing={2}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Typography component='p' variant='h5'>
					{course.price}₽
				</Typography>
				<Button type='button' variant='contained' color='primary'>
					Добавить в корзину
				</Button>
			</Stack>
		</Box>
	)
}

CourseHome.Skeleton = () => {
	return (
		<Box component='section'>
			<Skeleton variant='rectangular' width={'100%'} height={300} />

			<Stack direction={'column'} justifyContent={'center'} sx={{ py: 2 }}>
				<Skeleton variant='text' width={'90%'} height={50} />
				<Skeleton variant='text' width={'80%'} />
				<Skeleton variant='text' width={'90%'} />
				<Skeleton variant='text' width={'60%'} />
			</Stack>

			<Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ mb: 2 }}>
				<Typography
					component='p'
					variant='body1'
					sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
				>
					Категория:
				</Typography>
				<Skeleton variant='text' width={100} height={30} />
			</Stack>
			<Stack direction={'row'} spacing={1} flexWrap={'wrap'} sx={{ mb: 2 }}>
				{Array(5)
					.fill(null)
					.map((_, index) => (
						<Skeleton key={index} variant='rounded' width={50} height={30} />
					))}
			</Stack>

			<Stack
				direction={'row'}
				spacing={2}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Skeleton variant='rectangular' width={50} height={40} />
				<Button type='button' variant='contained' color='primary'>
					Добавить в корзину
				</Button>
			</Stack>
		</Box>
	)
}

export default CourseHome
