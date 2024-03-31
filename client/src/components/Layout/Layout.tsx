import { ThemeProvider } from '@emotion/react'
import {
	Container,
	createTheme,
	CssBaseline,
	useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { createContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { API_URL } from '../../http'
import getPalette from '../../libs/theme/getPalette'
import { setColorMode } from '../../redux/theme/themeSlice'
import { setCurrentUser, setLoading } from '../../redux/user/userSlice'
import { AuthResponse } from '../../types/response/AuthResponse'
import Header from '../Header/Header'

export const ColorModeContext = createContext({
	mode: 'light',
	toggleColorMode: () => {},
})

const Layout = () => {
	const dispatch = useDispatch()
	const themeMode = useSelector((state: any) => state.theme.mode)
	const prefersMode = useMediaQuery('(prefers-color-scheme: dark)')
		? 'dark'
		: 'light'

	useEffect(() => {
		if (prefersMode) {
			dispatch(setColorMode(prefersMode))
		}
	}, [prefersMode])

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getPalette(themeMode)), [themeMode])

	useEffect(() => {
		const checkAuth = async () => {
			dispatch(setLoading(true))
			if (localStorage.getItem('token')) {
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
					dispatch(setLoading(false))
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
