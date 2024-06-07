import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CourseCard from '../components/CourseCard'
import { RootState } from '../redux/store'
import { setCurrentUser } from '../redux/user/userSlice'
import { removeCourseFromCart, updateUser } from '../services/UserService'

const CartPage = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const dispatch = useDispatch()

	const totalPrice = user?.cart.reduce((acc, course) => {
		return acc + course?.price!
	}, 0)

	const handlePayClick = () => {
		console.log('Pay')
	}

	const handleRemoveCourseFromCartClick = async (id: string) => {
		try {
			const response = await removeCourseFromCart(user?._id!, id)

			if (response.status !== 200) {
				toast.error('Произошла ошибка при удалении курса из корзины')
				return
			}

			dispatch(setCurrentUser(response.data))
			toast.success('Курс удален из корзины')
		} catch (err) {
			console.log(err)
		}
	}

	const handleClearCartClick = async () => {
		try {
			const response = await updateUser(user?._id!, {
				cart: [],
			})

			if (response.status !== 200) {
				toast.error('Произошла ошибка при очистке корзины')
				return
			}

			dispatch(setCurrentUser(response.data))
			toast.success('Корзина очищена')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Box component='section' sx={{ py: 4 }}>
			<Typography variant='h4' component='h2'>
				Корзина
			</Typography>

			<Stack
				direction='column'
				alignItems='center'
				justifyContent='center'
				sx={{ my: 6, flexWrap: 'wrap', gap: 2 }}
			>
				{user?.cart?.map(course => (
					<Stack
						key={course._id}
						direction='row'
						spacing={2}
						alignItems='center'
					>
						<CourseCard course={course} />
						<Button
							type='button'
							variant='contained'
							color='error'
							size='small'
							onClick={() => handleRemoveCourseFromCartClick(course._id)}
						>
							Удалить из корзины
						</Button>
					</Stack>
				))}
			</Stack>

			<Stack direction='column' alignItems='end' spacing={2}>
				<Typography component='p' variant='h5'>
					Итого к оплате: {totalPrice}₽
				</Typography>
				<Button type='button' variant='contained' onClick={handlePayClick}>
					Перейти к оплате
				</Button>
				<Button
					type='button'
					variant='contained'
					color='error'
					onClick={handleClearCartClick}
				>
					Очистить корзину
				</Button>
			</Stack>
		</Box>
	)
}
export default CartPage
