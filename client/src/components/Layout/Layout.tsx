import { ThemeProvider } from '@emotion/react'
import {
	Container,
	createTheme,
	CssBaseline,
	PaletteMode,
	useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { API_URL } from '../../http'
import { setCurrentUser, setLoading } from '../../redux/user/userSlice'
import getPalette from '../../theme/getPalette'
import { AuthResponse } from '../../types/response/AuthResponse'
import Header from '../Header/Header'

export const ColorModeContext = createContext({
	mode: 'light',
	toggleColorMode: () => {},
})

const Layout = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const prefersMode = useMediaQuery('(prefers-color-scheme: dark)')
		? 'dark'
		: 'light'
	const [mode, setMode] = useState<PaletteMode>(prefersMode)

	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light'
				)
			},
		}),
		[]
	)

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getPalette(mode)), [mode])

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
		<ColorModeContext.Provider
			value={{
				mode,
				toggleColorMode: colorMode.toggleColorMode,
			}}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Header />

				<Container maxWidth='lg' sx={{ minHeight: '100vh', paddingTop: 10 }}>
					<main>
						<Outlet />
					</main>
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
export default Layout
