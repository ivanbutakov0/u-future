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
	Skeleton,
} from '@mui/material'
import { useState } from 'react'
import { TCategory } from '../../../types/TCategory'
import { ParentCategory } from '../../../types/TParentCategory'

type Props = {
	parentCategory: ParentCategory
	selectedCategory: TCategory | null
	setSelectedCategory: (category: TCategory) => void
}

const CategoryFilterItem = ({
	parentCategory,
	selectedCategory,
	setSelectedCategory,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setIsOpen(prev => !prev)
	}

	const handleClickAway = () => {
		setIsOpen(false)
	}

	const handleItemClick = (category: TCategory) => {
		setSelectedCategory(category)
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
			<Collapse
				in={isOpen}
				timeout='auto'
				unmountOnExit
				sx={{
					maxHeight: '300px',
					overflow: 'auto',
				}}
			>
				<ClickAwayListener onClickAway={handleClickAway}>
					<List component='div' disablePadding>
						{parentCategory.categories?.map(category => (
							<ListItem disablePadding key={category.name}>
								<ListItemIcon></ListItemIcon>
								<ListItemButton
									sx={{ pl: 4 }}
									selected={category.name === selectedCategory?.name}
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

CategoryFilterItem.Skeleton = () => {
	return (
		<>
			<Skeleton
				variant='rectangular'
				width={'100%'}
				height={40}
				sx={{ mb: 2 }}
			/>
			<Skeleton variant='rectangular' width={'100%'} height={40} />
		</>
	)
}
export default CategoryFilterItem
