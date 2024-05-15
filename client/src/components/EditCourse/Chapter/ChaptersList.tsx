import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from '@hello-pangea/dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Chip, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { TChapter } from '../../../types/TChapter'

type ChaptersListProps = {
	onEdit: (chapterId: string) => void
	onReorder: (
		bulkUpdateData: { id: string; position: number }[]
	) => Promise<void>
	items: TChapter[]
}

const ChaptersList = ({ onEdit, onReorder, items }: ChaptersListProps) => {
	const [chapters, setChapters] = useState<TChapter[]>(items)
	const theme = useTheme()

	useEffect(() => {
		setChapters(items)
	}, [items])

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result

		if (!destination) return

		if (destination.index === source.index) return

		const items = Array.from(chapters)
		const [reorderedItem] = items.splice(source.index, 1)
		items.splice(destination.index, 0, reorderedItem)

		setChapters(items)

		const startIndex = Math.min(source.index, destination.index)
		const endIndex = Math.max(source.index, destination.index)

		const updatedChapters = items.slice(startIndex, endIndex + 1)

		const bulkUpdateData = updatedChapters.map(chapter => ({
			id: chapter._id,
			position: items.findIndex(item => item._id === chapter._id),
		}))

		onReorder(bulkUpdateData)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='chapters'>
				{provided => (
					<Box
						component='div'
						{...provided.droppableProps}
						ref={provided.innerRef}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 1,
						}}
					>
						{chapters.map((chapter, index) => (
							<Draggable
								key={chapter._id}
								draggableId={chapter._id}
								index={index}
							>
								{provided => (
									<Box
										component='div'
										{...provided.draggableProps}
										ref={provided.innerRef}
										sx={{
											display: 'flex',
											alignItems: 'center',
											bgcolor: theme.palette.secondary.main,
											borderRadius: '4px',
											p: 1,
										}}
									>
										<Box
											component='div'
											{...provided.dragHandleProps}
											sx={{
												padding: '4px',
												bgcolor: blueGrey[50],
												border: `1px solid ${blueGrey[100]}`,
												borderRadius: '4px',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												width: '28px',
												height: '28px',
												mr: 1,
												'&:hover': {
													bgcolor: blueGrey[100],
												},
											}}
										>
											<DragIndicatorIcon width='100%' height='100%' />
										</Box>
										{chapter.title}

										<Box
											component='div'
											sx={{
												display: 'flex',
												ml: 'auto',
												alignItems: 'center',
												gap: 1,
											}}
										>
											{chapter.isFree && (
												<Chip color='success' label='Free' size='small' />
											)}
											<Chip
												color='info'
												label={
													chapter.isPublished ? 'Опубликована' : 'Черновик'
												}
												size='small'
											/>
											<EditIcon
												sx={{
													width: '16px',
													height: '16px',
													cursor: 'pointer',
												}}
												onClick={() => onEdit(chapter._id)}
											/>
										</Box>
									</Box>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</Box>
				)}
			</Droppable>
		</DragDropContext>
	)
}
export default ChaptersList
