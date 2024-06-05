import MenuIcon from '@mui/icons-material/Menu'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton, Link, ListItem, Stack, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { setSideMenuOpen } from '../redux/generalSettings/generalSettingsSlice'
import { RootState } from '../redux/store'
import { AppBar } from './SideMenu/settings'
import CustomAvatar from './ui/CustomAvatar'
import CustomLink from './ui/CustomLink'

const Header = () => {
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const isUserLoading = useSelector((state: RootState) => state.user.isLoading)
	const dispatch = useDispatch()

	const handleSideMenuOpen = () => {
		dispatch(setSideMenuOpen(true))
	}

	return (
		<AppBar position='fixed' color='default' open={isSideMenuOpen}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Stack direction='row' alignItems='center' gap={2}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleSideMenuOpen}
						edge='start'
						sx={{
							...(isSideMenuOpen && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Stack direction='row' alignItems='center'>
						<Link
							component={RouterLink}
							color='inherit'
							underline='none'
							to='/'
						>
							<IconButton edge='start' color='inherit' aria-label='menu'>
								<SchoolIcon />
							</IconButton>
						</Link>
						<Link
							component={RouterLink}
							color='inherit'
							underline='none'
							to='/'
						>
							uFUTURE
						</Link>
					</Stack>
				</Stack>

				<Stack
					direction='row'
					alignItems='center'
					gap={2}
					sx={{ display: { xs: 'none', sm: 'flex' } }}
				></Stack>

				{!user && !isUserLoading && (
					<ListItem disablePadding>
						<CustomLink to='/login' navLink type='button' paddings='small'>
							Войти
						</CustomLink>
					</ListItem>
				)}

				{isUserLoading && !user && <CustomAvatar.Skeleton />}
				<Stack direction='row' alignItems='center' gap={2}>
					{user && (
						<Link
							component={RouterLink}
							color='inherit'
							underline='none'
							to='/profile'
							sx={{
								':hover': {
									color: 'text.secondary',
								},
							}}
						>
							Баланс: {user.money}
						</Link>
					)}
					{user && <CustomAvatar />}
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
export default Header
