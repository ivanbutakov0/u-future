import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllParentCategories } from '../../services/CategoryService'
import { CourseResponse } from '../../types/response/CourseResponse'
import { ParentCategory } from '../../types/TParentCategory'
import CardBackground from './CardBackground'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

const CourseForm = ({ initialData, setData }: Props) => {
	const [open, setOpen] = useState(false)
	const [parentCategories, setParentCategories] = useState<ParentCategory[]>([])

	useEffect(() => {
		const getCategories = async () => {
			try {
				const parentCategories = await getAllParentCategories()
				if (!parentCategories) {
					console.log('No parent categories')
					return
				}
				setParentCategories(parentCategories.data)
			} catch (err) {
				console.log(err)
			}
		}
		getCategories()
	}, [])

	const handleEditClick = () => {
		console.log('edit click')
	}

	const handleListItemClick = () => {
		setOpen(prev => !prev)
	}

	return (
		<CardBackground>
			<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
				Название курса
			</Typography>

			<List
				component='nav'
				subheader={
					<ListSubheader
						component='div'
						sx={{
							backgroundColor: 'transparent',
							fontWeight: 'bold',
						}}
					>
						Категории
					</ListSubheader>
				}
			>
				<ListItemButton onClick={handleListItemClick}>
					<ListItemIcon>
						<CodeIcon />
					</ListItemIcon>
					<ListItemText primary='Разработка' />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary='Starred' />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</CardBackground>
	)
}
export default CourseForm
