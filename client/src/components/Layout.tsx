import { ThemeProvider } from '@emotion/react'
import {
	Container,
	createTheme,
	CssBaseline,
	useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { API_URL } from '../http'
import getPalette from '../libs/theme/getPalette'
import { setColorMode } from '../redux/theme/themeSlice'
import { setCurrentUser, setIsLoading } from '../redux/user/userSlice'
import { AuthResponse } from '../types/response/AuthResponse'
import Header from './Header'

const Layout = () => {
	const dispatch = useDispatch()
	const themeMode = useSelector((state: any) => state.theme.mode)
	const prefersMode =
		localStorage.getItem('themeMode') ||
		(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light')

	// Set color mode
	useEffect(() => {
		if (prefersMode) {
			dispatch(setColorMode(prefersMode))
		}
	}, [])

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getPalette(themeMode)), [themeMode])

	// Check authentication
	useEffect(() => {
		const checkAuth = async () => {
			if (localStorage.getItem('token')) {
				dispatch(setIsLoading(true))
				try {
					const response = await axios.get<AuthResponse>(
						`${API_URL}/user/refresh`,
						{
							withCredentials: true,
						}
					)
					console.log(response)
					localStorage.setItem('token', response.data.accessToken)
					dispatch(setCurrentUser(response.data.userData))
				} catch (err) {
					console.log(err)
				} finally {
					dispatch(setIsLoading(false))
				}
			}
		}

		checkAuth()
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Header />

			<Container maxWidth='lg' sx={{ minHeight: '100vh', paddingTop: 10 }}>
				<main>
					<Outlet />
				</main>
			</Container>
		</ThemeProvider>
	)
}
export default Layout
