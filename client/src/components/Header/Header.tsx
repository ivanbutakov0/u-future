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
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toggleColorMode } from '../../redux/theme/themeSlice'
import DarkModeSwitch from '../ui/DarkModeSwitch/DarkModeSwitch'

const Header = () => {
	const themeMode = useSelector((state: any) => state.theme.mode)
	const dispatch = useDispatch()

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
						onClick={() => dispatch(toggleColorMode())}
						checked={themeMode === 'dark'}
					/>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
export default Header
