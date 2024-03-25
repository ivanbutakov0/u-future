import SchoolIcon from '@mui/icons-material/School'
import {
	AppBar,
	IconButton,
	List,
	ListItem,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ColorModeContext } from '../Layout/Layout'
import DarkModeSwitch from '../ui/DarkModeSwitch/DarkModeSwitch'

const Header = () => {
	const colorMode = useContext(ColorModeContext)

	return (
		<AppBar position='fixed' color='default'>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Stack direction='row' alignItems='center'>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<SchoolIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						uFUTURE
					</Typography>
				</Stack>

				<Stack direction='row' alignItems='center' gap={2}>
					<nav>
						<List sx={{ display: 'flex', gap: 2, fontSize: 16 }} disablePadding>
							<ListItem
								sx={{
									transition: 'all 0.2s ease-in-out',
									':hover': {
										color: 'text.secondary',
									},
								}}
								disablePadding
							>
								<NavLink to='/'>Home</NavLink>
							</ListItem>
							<ListItem
								sx={{
									transition: 'all 0.2s ease-in-out',
									':hover': {
										color: 'text.secondary',
									},
								}}
								disablePadding
							>
								<NavLink to='/courses'>Courses</NavLink>
							</ListItem>
						</List>
					</nav>
					<DarkModeSwitch
						onClick={colorMode.toggleColorMode}
						checked={colorMode.mode === 'dark'}
					/>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
export default Header
