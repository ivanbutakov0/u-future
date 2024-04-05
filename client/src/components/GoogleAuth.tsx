import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser, setIsLoading } from '../redux/user/userSlice'
import { AuthResponse } from '../types/response/AuthResponse'

const GoogleAuth = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: async ({ code }) => {
			try {
				dispatch(setIsLoading(true))
				const response = await axios.post<AuthResponse>(
					`${import.meta.env.VITE_API_URL}/user/google-auth`,
					{
						code,
					},
					{
						withCredentials: true,
					}
				)
				localStorage.setItem('token', response.data.accessToken)
				dispatch(setCurrentUser(response.data.userData))
				dispatch(setIsLoading(false))
				navigate('/')
			} catch (err) {
				dispatch(setIsLoading(false))
				console.log(err)
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
