import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	Popover,
	Skeleton,
	Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { setCurrentUser } from '../../redux/user/userSlice'
import { logout } from '../../services/AuthService'
import CustomLink from './CustomLink'

const CustomAvatar = () => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const avatarRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleAvatarClick = () => {
		setIsPopoverOpen(prev => !prev)
	}

	const handlePopoverClose = () => {
		setIsPopoverOpen(false)
	}

	const handleDialogOpen = () => {
		setIsDialogOpen(true)
	}

	const handleDialogClose = () => {
		setIsDialogOpen(false)
		handlePopoverClose()
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
				onClick={handleAvatarClick}
				src={user?.avatar || ''}
				sx={{
					bgcolor: user?.backgroundAvatar || 'gray',
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
				onClose={handlePopoverClose}
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
						<CustomLink
							to='/profile'
							styles={{ display: 'flex', alignItems: 'center', gap: 1 }}
						>
							<AccountCircleIcon />
							Профиль
						</CustomLink>
					</ListItem>
					<ListItem>
						<Typography
							onClick={handleDialogOpen}
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

			<Dialog
				open={isDialogOpen}
				onClose={handleDialogClose}
				maxWidth='xs'
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Вы уверены, что хотите выйти?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Если после выхода вы вновь захотите воспользоваться нашим сервисом,
						вам придется войти снова
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialogClose}
						variant='outlined'
						color='secondary'
						size='small'
					>
						Отмена
					</Button>
					<Button
						onClick={handleLogout}
						variant='outlined'
						color='error'
						size='small'
						autoFocus
					>
						Выход
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

CustomAvatar.Skeleton = () => {
	return <Skeleton variant='circular' width={40} height={40} />
}

export default CustomAvatar
