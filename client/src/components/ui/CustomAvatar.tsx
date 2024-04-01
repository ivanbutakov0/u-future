import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
	Avatar,
	Link,
	List,
	ListItem,
	Popover,
	Skeleton,
	Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { setCurrentUser } from '../../redux/user/userSlice'
import { logout } from '../../services/AuthService'
import generateRandomHexColor from '../../utils/generateRandomHexColor'

const CustomAvatar = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const avatarRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const bgColor = generateRandomHexColor()

	const handleClick = () => {
		setIsPopoverOpen(prev => !prev)
	}

	const handleClose = () => {
		setIsPopoverOpen(false)
	}

	const handleLogout = async () => {
		await logout()
		setIsPopoverOpen(false)
		localStorage.removeItem('token')
		dispatch(setCurrentUser(null))
		navigate('/')
	}

	return (
		<>
			<Avatar
				ref={avatarRef}
				onClick={handleClick}
				sx={{
					bgcolor: bgColor,
					fontWeight: 'bold',
					color: 'white',
					cursor: 'pointer',
					transition: 'all 0.2s ease-in-out',
					':hover': {
						filter: 'brightness(0.8)',
					},
				}}
			>
				{user?.username[0].toUpperCase()}
			</Avatar>
			<Popover
				anchorEl={avatarRef.current}
				open={isPopoverOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				sx={{
					marginTop: '12px',
				}}
			>
				<List>
					<ListItem>
						<Link
							component={RouterLink}
							underline='none'
							color='inherit'
							to='/profile'
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								transition: 'all 0.2s ease-in-out',
								':hover': {
									color: 'text.secondary',
								},
							}}
						>
							<AccountCircleIcon />
							Профиль
						</Link>
					</ListItem>
					<ListItem>
						<Typography
							onClick={handleLogout}
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								cursor: 'pointer',
								transition: 'all 0.2s ease-in-out',
								':hover': {
									color: 'text.secondary',
								},
							}}
						>
							<ExitToAppIcon /> Выйти
						</Typography>
					</ListItem>
				</List>
			</Popover>
		</>
	)
}

CustomAvatar.Skeleton = () => {
	return <Skeleton variant='circular' width={40} height={40} />
}

export default CustomAvatar
