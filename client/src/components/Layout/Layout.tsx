import { ThemeProvider } from '@emotion/react'
import {
	createTheme,
	CssBaseline,
	PaletteMode,
	useMediaQuery,
} from '@mui/material'
import { createContext, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import getPalette from '../../theme/getPalette'
import Header from '../Header/Header'

export const ColorModeContext = createContext({
	mode: 'light',
	toggleColorMode: () => {},
})

const Layout = () => {
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

	return (
		<ColorModeContext.Provider
			value={{
				mode: prefersMode,
				toggleColorMode: colorMode.toggleColorMode,
			}}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Header />

				<main className='container'>
					<Outlet />
				</main>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
export default Layout
