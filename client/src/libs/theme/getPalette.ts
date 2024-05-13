import { PaletteMode } from '@mui/material'

const getPalette = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					primary: {
						main: '#0070f0',
					},
					secondary: {
						light: '#f1f9ff',
						main: '#d9efff',
					},
					accent: {
						main: '#342fcc',
					},
					text: {
						primary: '#040316',
						secondary: '#91919e',
					},
			  }
			: {
					primary: {
						main: '#0070f0',
					},
					secondary: {
						light: '#121f29',
						main: '#4b5f6e',
					},
					accent: {
						main: '#342fcc',
					},
					text: {
						primary: '#EAE9FC',
						secondary: '#9d9dab',
					},
			  }),
	},
})

export default getPalette
