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
						main: '#90caf9',
						light: '#f1f9ff',
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
						main: '#11519a',
					},
					secondary: {
						main: '#90caf9',
						light: '#121f29',
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
