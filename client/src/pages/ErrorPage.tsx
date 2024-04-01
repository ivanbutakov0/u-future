import { Box, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const ErrorPage = () => {
	return (
		<Box component='div' sx={{ textAlign: 'center', pt: 4 }}>
			<Typography variant='h2'>404</Typography>
			<Box
				component='div'
				sx={{
					height: '400px',
					width: '533px',
					margin: '0 auto',
					mt: 2,
					backgroundImage: 'url(./error.gif)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			></Box>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Похоже вы потерялись
			</Typography>
			<Typography variant='body1' sx={{ mb: 4 }}>
				страница, которую вы ищете, недоступна!
			</Typography>
			<Typography>
				<Link
					component={RouterLink}
					to='/'
					sx={{
						textDecoration: 'none',
						color: 'white',
						backgroundColor: '#11519a',
						padding: '10px 20px',
						borderRadius: '10px',
						transition: 'all 0.3s ease-in-out',
						':hover': {
							backgroundColor: '#342fcc',
						},
					}}
				>
					Перейти на главную
				</Link>
			</Typography>
		</Box>
	)
}
export default ErrorPage
