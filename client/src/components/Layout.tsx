import { ThemeProvider } from '@emotion/react'
import {
	Box,
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
import { setCart } from '../redux/cart/cartSlice'
import { RootState } from '../redux/store'
import { setColorMode } from '../redux/theme/themeSlice'
import { setCurrentUser, setIsLoading } from '../redux/user/userSlice'
import { AuthResponse } from '../types/response/AuthResponse'
import Header from './Header'
import SideMenu from './SideMenu/SideMenu'
import { drawerWidth } from './SideMenu/settings'

const Layout = () => {
	const dispatch = useDispatch()
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)
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
		let cancelled = false

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
					localStorage.setItem('token', response.data.accessToken)
					dispatch(setCurrentUser(response.data.userData))
					dispatch(setCart(response.data.userData.cart))
				} catch (err) {
					console.log(err)
				} finally {
					dispatch(setIsLoading(false))
				}
			}
		}

		if (!cancelled) {
			checkAuth()
		}

		return () => {
			cancelled = true
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Header />

			<SideMenu />
			<Container
				maxWidth='lg'
				sx={{
					minHeight: '100vh',
					paddingTop: 10,
				}}
			>
				<Box
					component='main'
					sx={{
						pl: 8,
						...(isSideMenuOpen && { paddingLeft: `${drawerWidth}px` }),
					}}
				>
					<Outlet />
				</Box>
			</Container>
		</ThemeProvider>
	)
}
export default Layout
