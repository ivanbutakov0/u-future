import SettingsIcon from '@mui/icons-material/settings'
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { toggleColorMode } from '../../redux/theme/themeSlice'
import DarkModeSwitch from '../ui/DarkModeSwitch'

const OtherNavigation = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const themeMode = useSelector((state: RootState) => state.theme.mode)
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)

	const onSwitchToggle = () => {
		dispatch(toggleColorMode())
		localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')
	}

	return (
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
	)
}
export default OtherNavigation
