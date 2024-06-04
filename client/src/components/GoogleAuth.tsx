import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser, setIsLoading } from '../redux/user/userSlice'
import { googleAuth } from '../services/AuthService'

const GoogleAuth = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: async ({ code }) => {
			try {
				dispatch(setIsLoading(true))
				const response = await googleAuth(code)
				localStorage.setItem('token', response.data.accessToken)
				dispatch(setCurrentUser(response.data.userData))

				navigate('/')
			} catch (err) {
				console.log(err)
			} finally {
				dispatch(setIsLoading(false))
			}
		},
	})
	return (
		<Button
			type='button'
			variant='contained'
			color='error'
			fullWidth
			onClick={() => googleLogin()}
		>
			Войти с помощью Google
		</Button>
	)
}
export default GoogleAuth
