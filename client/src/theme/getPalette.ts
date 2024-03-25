import { PaletteMode } from '@mui/material'

const getPalette = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					primary: {
						main: '#2f27ce',
						accent: '#443dff',
					},
					secondary: {
						main: '#DDDBFF',
					},
					text: {
						primary: '#040316',
						secondary: '#91919e',
					},
			  }
			: {
					primary: {
						main: '#3a31d8',
						accent: '#0600c2',
					},
					secondary: {
						main: '#020024',
					},
					text: {
						primary: '#EAE9FC',
						secondary: '#9d9dab',
					},
			  }),
	},
})

export default getPalette
