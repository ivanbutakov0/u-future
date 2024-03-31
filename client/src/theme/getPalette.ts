import { PaletteMode } from '@mui/material'

const getPalette = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					primary: {
						main: '#11519a',
					},
					secondary: {
						main: '#9c27b0',
					},
					accent: {
						main: '#443dff',
					},
					text: {
						primary: '#040316',
						secondary: '#91919e',
					},
			  }
			: {
					primary: {
						main: '#11519a',
					},
					secondary: {
						main: '#9c27b0',
					},
					accent: {
						main: '#0600c2',
					},
					text: {
						primary: '#EAE9FC',
						secondary: '#9d9dab',
					},
			  }),
	},
})

export default getPalette
