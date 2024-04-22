import { ExpandLess, ExpandMore } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import {
	ClickAwayListener,
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { CourseResponse } from '../../../types/response/CourseResponse'
import { TCategory } from '../../../types/TCategory'
import { ParentCategory } from '../../../types/TParentCategory'

type Props = {
	parentCategory: ParentCategory
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
	setIsEditing: (data: boolean) => void
}

const CategoryItem = ({
	parentCategory,
	initialData,
	setData,
	setIsEditing,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setIsOpen(prev => !prev)
	}

	const handleClickAway = () => {
		setIsOpen(false)
	}

	const handleItemClick = (category: TCategory) => {
		setData({ ...initialData!, category })
		setIsEditing(false)
	}

	return (
		<>
			<ListItemButton onClick={handleOpen}>
				<ListItemIcon>
					<CodeIcon />
				</ListItemIcon>
				<ListItemText
					primary={parentCategory.name}
					primaryTypographyProps={{
						textTransform: 'capitalize',
						fontWeight: 'bold',
					}}
				/>
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={isOpen} timeout='auto' unmountOnExit>
				<ClickAwayListener onClickAway={handleClickAway}>
					<List component='div' disablePadding>
						{parentCategory.categories?.map(category => (
							<ListItem disablePadding key={category.name}>
								<ListItemIcon></ListItemIcon>
								<ListItemButton
									sx={{ pl: 4 }}
									selected={category.name === initialData?.category?.name}
									onClick={() => handleItemClick(category)}
								>
									<ListItemText
										primary={category.name}
										primaryTypographyProps={{ textTransform: 'capitalize' }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</ClickAwayListener>
			</Collapse>
		</>
	)
}
export default CategoryItem
