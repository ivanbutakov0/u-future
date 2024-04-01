import SchoolIcon from '@mui/icons-material/School'
import {
	AppBar,
	Box,
	IconButton,
	Link,
	List,
	ListItem,
	Stack,
	Toolbar,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import { RootState } from '../redux/store'
import { toggleColorMode } from '../redux/theme/themeSlice'
import CustomAvatar from './ui/CustomAvatar'
import DarkModeSwitch from './ui/DarkModeSwitch'

const Header = () => {
	const themeMode = useSelector((state: any) => state.theme.mode)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const isUserLoading = useSelector((state: RootState) => state.user.isLoading)
	const dispatch = useDispatch()

	const onSwitchToggle = () => {
		dispatch(toggleColorMode())
		localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')
	}

	return (
		<AppBar position='fixed' color='default'>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Stack direction='row' alignItems='center'>
					<Link component={RouterLink} color='inherit' underline='none' to='/'>
						<IconButton edge='start' color='inherit' aria-label='menu'>
							<SchoolIcon />
						</IconButton>
					</Link>
					<Link component={RouterLink} color='inherit' underline='none' to='/'>
						uFUTURE
					</Link>
				</Stack>

				<Stack direction='row' alignItems='center' gap={2}>
					<Box component='nav'>
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
								<Link
									to='/'
									component={RouterNavLink}
									underline='none'
									color='inherit'
								>
									Главная
								</Link>
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
								<Link
									to='/courses'
									component={RouterNavLink}
									underline='none'
									color='inherit'
								>
									Курсы
								</Link>
							</ListItem>

							<ListItem
								sx={{
									marginLeft: '15px',
								}}
								disablePadding
							>
								<DarkModeSwitch
									onClick={onSwitchToggle}
									checked={themeMode === 'dark'}
								/>
							</ListItem>

							{!user && !isUserLoading && (
								<ListItem disablePadding>
									<Link
										to='/login'
										component={RouterNavLink}
										underline='none'
										sx={{
											backgroundColor: 'primary.main',
											color: 'white',
											padding: '2px 12px',
											borderRadius: '14px',
											':hover': {
												backgroundColor: 'accent.main',
											},
											transition: 'all 0.2s ease-in-out',
										}}
									>
										Войти
									</Link>
								</ListItem>
							)}
						</List>
					</Box>

					{isUserLoading && <CustomAvatar.Skeleton />}

					{user && <CustomAvatar />}
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
export default Header
