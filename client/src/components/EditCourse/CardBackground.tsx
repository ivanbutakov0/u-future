import { Box, useTheme } from '@mui/material'
import { ReactNode } from 'react'

const CardBackground = ({ children }: { children: ReactNode }) => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.secondary.light,
				borderRadius: 2,
				p: 3,
				position: 'relative',
			}}
		>
			{children}
		</Box>
	)
}
export default CardBackground
