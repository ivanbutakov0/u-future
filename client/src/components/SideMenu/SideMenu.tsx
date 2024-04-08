import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setSideMenuOpen } from '../../redux/generalSettings/generalSettingsSlice'
import { RootState } from '../../redux/store'
import { toggleColorMode } from '../../redux/theme/themeSlice'
import DarkModeSwitch from '../ui/DarkModeSwitch'
import { Drawer, DrawerHeader } from './settings'

type navigationItem = {
	text: string
	link: string
	icon: JSX.Element
}

const navigationItems: navigationItem[] = [
	{
		text: 'Главная',
		link: '/',
		icon: <SpaceDashboardIcon />,
	},
	{
		text: 'Поиск курсов',
		link: '/courses',
		icon: <SearchIcon />,
	},
]

const SideMenu = () => {
	const navigate = useNavigate()
	const theme = useTheme()
	const dispatch = useDispatch()
	const themeMode = useSelector((state: RootState) => state.theme.mode)
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)
	const { pathname } = useLocation()

	const handleDrawerClose = () => {
		dispatch(setSideMenuOpen(false))
	}

	const onSwitchToggle = () => {
		dispatch(toggleColorMode())
		localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')
	}

	return (
		<Drawer variant='permanent' open={isSideMenuOpen}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{navigationItems.map(item => (
					<ListItem
						key={item.text}
						disablePadding
						sx={{
							display: 'block',
							...(pathname === item.link && {
								backgroundColor: theme.palette.secondary.light,
								borderRight: `3px solid ${theme.palette.primary.main}`,
							}),
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: isSideMenuOpen ? 'initial' : 'center',
								px: 2.5,
							}}
							onClick={() => navigate(item.link)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: isSideMenuOpen ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
								sx={{ opacity: isSideMenuOpen ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: isSideMenuOpen ? 'initial' : 'center',
							px: 2.5,
						}}
						onClick={() => navigate('/settings')}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: isSideMenuOpen ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Настройки'}
							sx={{ opacity: isSideMenuOpen ? 1 : 0 }}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding sx={{ display: 'block' }}>
					<DarkModeSwitch
						onClick={onSwitchToggle}
						checked={themeMode === 'dark'}
					/>
				</ListItem>
			</List>
		</Drawer>
	)
}
export default SideMenu
