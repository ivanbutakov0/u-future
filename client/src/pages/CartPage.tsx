import { Box, Button, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import CourseCard from '../components/CourseCard'
import { RootState } from '../redux/store'

const CartPage = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)

	const totalPrice = user?.cart.reduce((acc, course) => {
		return acc + course?.price!
	}, 0)

	const handlePayClick = () => {
		console.log('Pay')
	}

	const handleDeleteCourseClick = (id: string) => {
		console.log(id)
	}

	const handleClearCartClick = () => {
		console.log('Clear cart')
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
							onClick={() => handleDeleteCourseClick(course._id)}
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
