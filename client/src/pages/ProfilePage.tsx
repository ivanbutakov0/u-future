import {
	Box,
	Button,
	Chip,
	Modal,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
}

const ProfilePage = () => {
	const [open, setOpen] = useState(false)

	const user = useSelector((state: RootState) => state.user.currentUser)
	const isLoading = useSelector((state: RootState) => state.user.isLoading)

	const navigate = useNavigate()

	useEffect(() => {
		let cancelled = false

		console.log('isLoading', isLoading)

		if (!isLoading && !user) {
			if (cancelled) return
			navigate('/login')
		}

		return () => {
			cancelled = true
		}
	}, [isLoading])

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleMoneyClick = async (money: number) => {
		console.log(money)
	}

	if (isLoading) {
		return <ProfilePage.Skeleton />
	}

	return (
		<Stack
			component='section'
			direction='column'
			spacing={4}
			alignItems={'center'}
			sx={{ py: 4 }}
		>
			<Typography variant='h4' component='h2'>
				Профиль
			</Typography>
			<Box
				sx={{
					width: '200px',
					height: '200px',
					backgroundColor: user?.backgroundAvatar || 'lightgray',
					borderRadius: '50%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '70px',
					fontWeight: 'bold',
					textAlign: 'center',
					color: 'white',
					cursor: 'pointer',
				}}
			>
				{user?.avatar ? (
					<img src={user?.avatar} alt='avatar' />
				) : (
					user?.username[0].toUpperCase()
				)}
			</Box>

			<Typography variant='h5' component='p'>
				Имя пользователя: {user?.username}
			</Typography>
			<Typography variant='h5' component='p'>
				Email: {user?.email}
			</Typography>
			<Typography variant='h5' component='p'>
				Баланс: {user?.money}
			</Typography>

			<Button variant='contained' onClick={handleOpen}>
				Пополнить баланс
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h3'
						sx={{ mb: 2, textAlign: 'center' }}
					>
						Выберите сумму
					</Typography>
					<Stack
						direction='row'
						spacing={2}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Chip
							label='+100₽'
							variant='filled'
							color='primary'
							clickable
							onClick={() => handleMoneyClick(100)}
						/>
						<Chip
							label='+500₽'
							variant='filled'
							color='primary'
							clickable
							onClick={() => handleMoneyClick(500)}
						/>
						<Chip
							label='+1000₽'
							variant='filled'
							color='primary'
							clickable
							onClick={() => handleMoneyClick(1000)}
						/>
						<Chip
							label='+5000₽'
							variant='filled'
							color='primary'
							clickable
							onClick={() => handleMoneyClick(5000)}
						/>
					</Stack>
				</Box>
			</Modal>
		</Stack>
	)
}

ProfilePage.Skeleton = () => {
	return (
		<Stack
			component='section'
			direction='column'
			spacing={4}
			alignItems={'center'}
			sx={{ py: 4 }}
		>
			<Typography variant='h4' component='h2'>
				Профиль
			</Typography>
			<Skeleton variant='circular' sx={{ width: 200, height: 200 }} />

			<Skeleton variant='text' width={200} height={50} />
			<Skeleton variant='text' width={200} height={50} />
			<Skeleton variant='text' width={200} height={50} />
		</Stack>
	)
}

export default ProfilePage
