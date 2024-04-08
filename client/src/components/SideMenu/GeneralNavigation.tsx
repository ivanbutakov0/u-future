import SearchIcon from '@mui/icons-material/Search'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

type generalNavigationItem = {
	text: string
	link: string
	icon: JSX.Element
}

const generalNavigationItems: generalNavigationItem[] = [
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

const GeneralNavigation = () => {
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const theme = useTheme()

	return (
		<List>
			{generalNavigationItems.map(item => (
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
	)
}
export default GeneralNavigation
