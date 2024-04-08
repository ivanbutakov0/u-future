import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setSideMenuOpen } from '../../redux/generalSettings/generalSettingsSlice'
import { RootState } from '../../redux/store'
import GeneralNavigation from './GeneralNavigation'
import OtherNavigation from './OtherNavigation'
import { Drawer, DrawerHeader } from './settings'
import TeacherNavigation from './TeacherNavigation'

const SideMenu = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const isSideMenuOpen = useSelector(
		(state: RootState) => state.generalSettings.isSideMenuOpen
	)
	const handleDrawerClose = () => {
		dispatch(setSideMenuOpen(false))
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
			<GeneralNavigation />
			<Divider />
			<TeacherNavigation />
			<Divider />
			<OtherNavigation />
		</Drawer>
	)
}
export default SideMenu
