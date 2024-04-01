import { Box, Typography } from '@mui/material'
import CustomLink from '../components/ui/CustomLink'

const ErrorPage = () => {
	return (
		<Box component='section' sx={{ textAlign: 'center', pt: 4 }}>
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
				<CustomLink
					to='/'
					type='button'
					paddings='large'
					styles={{
						backgroundColor: '#11519a',
						color: 'white',
						transition: 'all 0.2s ease-in-out',
						':hover': {
							backgroundColor: '#342fcc',
						},
					}}
				>
					Перейти на главную
				</CustomLink>
			</Typography>
		</Box>
	)
}
export default ErrorPage
