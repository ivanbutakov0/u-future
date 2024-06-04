import { ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TChapter } from '../../types/TChapter'

type Props = {
	chapter: TChapter
	selected: boolean
}

const ChapterItem = ({ chapter, selected }: Props) => {
	const navigate = useNavigate()

	const handleListItemClick = () => {
		navigate(`/courses/${chapter.course}/${chapter._id}`)
	}
	return (
		<ListItem disablePadding>
			<ListItemButton selected={selected} onClick={handleListItemClick}>
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
