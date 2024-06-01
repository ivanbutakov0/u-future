import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { List, ListSubheader, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllParentCategories } from '../../../services/CategoryService'
import { CourseResponse } from '../../../types/response/CourseResponse'
import { ParentCategory } from '../../../types/TParentCategory'
import CardBackground from '../CardBackground'
import CategoryItem from './CategoryItem'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

const CategoryForm = ({ initialData, setData }: Props) => {
	const [parentCategories, setParentCategories] = useState<ParentCategory[]>([])
	const [isEditing, setIsEditing] = useState<boolean>(false)

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
		setIsEditing(prev => !prev)
	}

	return (
		<CardBackground>
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
					Категория курса
				</Typography>
				{!isEditing ? (
					<Stack
						direction='row'
						spacing={1}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={handleEditClick}
					>
						<EditIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Изменить
						</Typography>
					</Stack>
				) : (
					<Stack
						direction='row'
						spacing={1}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={handleEditClick}
					>
						<CloseIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Отмена
						</Typography>
					</Stack>
				)}
			</Stack>

			<Typography variant='body1' component='p' sx={{ marginTop: 2 }}>
				Текущая категория:{' '}
				<Typography
					component='span'
					sx={{
						fontStyle: 'italic',
						fontWeight: 'bold',
						textTransform: 'capitalize',
					}}
				>
					{initialData?.category?.name || '...'}
				</Typography>
			</Typography>

			{isEditing && (
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
							Доступные категории
						</ListSubheader>
					}
				>
					{parentCategories.map(parentCategory => (
						<CategoryItem
							key={parentCategory.name}
							parentCategory={parentCategory}
							initialData={initialData}
							setData={setData}
							setIsEditing={setIsEditing}
						/>
					))}
				</List>
			)}
		</CardBackground>
	)
}
export default CategoryForm
