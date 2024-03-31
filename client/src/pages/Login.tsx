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
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import loginSchema from '../libs/zod/loginSchema'
import { setCurrentUser } from '../redux/user/userSlice'
import { login } from '../services/AuthService'

type TLoginSchema = z.infer<typeof loginSchema>

const LoginForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	})
	const onSubmit: SubmitHandler<TLoginSchema> = async data => {
		try {
			const response = await login(data.email, data.password)
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
					Вход в аккаунт
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						autoComplete='email'
						autoFocus
						{...register('email')}
					/>
					{errors.email && (
						<Typography variant='body2' color='error' component='span'>
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
						autoComplete='current-password'
						{...register('password')}
					/>
					{errors.password && (
						<Typography variant='body2' color='error' component='span'>
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
						Войти
					</Button>
					<Box component='div' sx={{ textAlign: 'end' }}>
						<Link component={RouterLink} to='/signup' variant='body2'>
							Нет аккаунта? Зарегистрироваться
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}
export default LoginForm
