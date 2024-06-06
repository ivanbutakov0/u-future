import { Box, Button, Chip, Skeleton, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CourseContext, TCourseContext } from '../../pages/CoursePage'
import { RootState } from '../../redux/store'
import { setCurrentUser } from '../../redux/user/userSlice'
import {
	addCourseToCart,
	removeCourseFromCart,
} from '../../services/UserService'

const CourseHome = () => {
	const [isCourseInCart, setIsCourseInCart] = useState<boolean>(false)
	const { course, isFetching } = useContext<TCourseContext>(CourseContext)
	const user = useSelector((state: RootState) => state.user.currentUser)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (user && course) {
			const courseInCart = user.cart.some(
				courseItem => courseItem._id === course._id
			)
			setIsCourseInCart(courseInCart)
		}
	}, [user, course])

	const handleAddToCartClick = async () => {
		if (!user) {
			toast.error('Для добавления в корзину необходимо авторизоваться')
			navigate('/login')
		}

		try {
			const response = await addCourseToCart(user?._id!, course._id)

			if (response.status !== 200) {
				toast.error(
					'Произошла ошибка на сервере при добавлении курса в корзину'
				)
				return
			}

			dispatch(setCurrentUser(response.data))
			toast.success('Курс добавлен в корзину')
		} catch (err: any) {
			console.log(err)
			toast.error(err.response.data.message)
		}
	}

	// TODO: handleRemoveFromCartClick
	const handleRemoveFromCartClick = async () => {
		if (!user) {
			toast.error('Для добавления в корзину необходимо авторизоваться')
			navigate('/login')
		}

		try {
			const response = await removeCourseFromCart(user?._id!, course._id)

			if (response.status !== 200) {
				toast.error('Произошла ошибка на сервере при удалении курса из корзины')
				return
			}

			dispatch(setCurrentUser(response.data))
			toast.success('Курс удален из корзины')
		} catch (err) {
			console.log(err)
		}
	}

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
					<Chip
						key={topic.name}
						label={topic.name}
						color='primary'
						variant='outlined'
					/>
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
				{isCourseInCart ? (
					<Button
						type='button'
						variant='contained'
						color='primary'
						onClick={handleRemoveFromCartClick}
					>
						Убрать из корзины
					</Button>
				) : (
					<Button
						type='button'
						variant='contained'
						color='primary'
						onClick={handleAddToCartClick}
					>
						Добавить в корзину
					</Button>
				)}
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
