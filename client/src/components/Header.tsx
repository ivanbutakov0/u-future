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
import { Link as RouterLink } from 'react-router-dom'
import { RootState } from '../redux/store'
import { toggleColorMode } from '../redux/theme/themeSlice'
import CustomAvatar from './ui/CustomAvatar'
import CustomLink from './ui/CustomLink'
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
							<ListItem disablePadding>
								<CustomLink to='/' navLink>
									Главная
								</CustomLink>
							</ListItem>
							<ListItem disablePadding>
								<CustomLink to='/courses' navLink>
									Курсы
								</CustomLink>
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
									<CustomLink
										to='/login'
										navLink
										type='button'
										paddings='small'
									>
										Войти
									</CustomLink>
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
