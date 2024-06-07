import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { TChapter } from '../../types/TChapter'

type Props = {
	chapter: TChapter
	selected: boolean
}

const ChapterItem = ({ chapter, selected }: Props) => {
	const user = useSelector((state: RootState) => state.user.currentUser)
	const navigate = useNavigate()

	const handleListItemClick = () => {
		navigate(`/courses/${chapter.course}/${chapter._id}`)
	}
	return (
		<ListItem disablePadding>
			<ListItemButton selected={selected} onClick={handleListItemClick}>
				{user?.finishedChapters.some(
					finishedChapter =>
						finishedChapter._id.toString() === chapter._id.toString()
				) ? (
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: 2,
						}}
					>
						<CheckCircleOutlineIcon color='success' />
					</ListItemIcon>
				) : null}

				<ListItemText primary={chapter.title} />
			</ListItemButton>
		</ListItem>
	)
}

ChapterItem.Skeleton = () => {
	return (
		<ListItem disablePadding>
			<Skeleton
				variant='rectangular'
				width={'100%'}
				height={40}
				sx={{ mt: 1 }}
			/>
		</ListItem>
	)
}

export default ChapterItem
