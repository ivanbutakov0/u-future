import { zodResolver } from '@hookform/resolvers/zod'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
	Avatar,
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import registrationSchema from '../libs/zod/registrationSchema'
import { setCurrentUser } from '../redux/user/userSlice'
import { registration } from '../services/AuthService'

type TRegistrationSchema = z.infer<typeof registrationSchema>

const SignUp = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TRegistrationSchema>({
		resolver: zodResolver(registrationSchema),
	})

	const onSubmit = async (data: TRegistrationSchema) => {
		try {
			const response = await registration(
				data.username,
				data.email,
				data.password
			)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(setCurrentUser(response.data.userData))
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Регистрация
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						autoComplete='given-name'
						required
						fullWidth
						id='username'
						label='Имя пользователя'
						autoFocus
						{...register('username')}
					/>
					{errors.username && (
						<Typography variant='body2' component='span' color='red'>
							{errors.username.message}
						</Typography>
					)}
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						autoComplete='email'
						{...register('email')}
					/>
					{errors.email && (
						<Typography variant='body2' component='span' color='red'>
							{errors.email.message}
						</Typography>
					)}
					<TextField
						margin='normal'
						required
						fullWidth
						label='Пароль'
						type='password'
						id='password'
						autoComplete='new-password'
						{...register('password')}
					/>
					{errors.password && (
						<Typography variant='body2' component='span' color='red'>
							{errors.password.message}
						</Typography>
					)}

					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						disabled={isSubmitting}
					>
						Регистрация
					</Button>
					<Box component='div' sx={{ textAlign: 'end' }}>
						<Link component={RouterLink} to='/login' variant='body2'>
							Уже есть аккаунт? Войти
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}
export default SignUp
