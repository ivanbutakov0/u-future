import { List, ListSubheader } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllParentCategories } from '../../../services/CategoryService'
import { TCategory } from '../../../types/TCategory'
import { ParentCategory } from '../../../types/TParentCategory'
import CategoryFilterItem from './CategoryFilterItem'

type Props = {
	selectedCategory: TCategory
	setSelectedCategory: (category: TCategory) => void
}

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: Props) => {
	const [parentCategories, setParentCategories] = useState<ParentCategory[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const getCategories = async () => {
			setIsLoading(true)
			try {
				const parentCategories = await getAllParentCategories()
				if (!parentCategories) {
					console.log('No parent categories')
					return
				}
				setParentCategories(parentCategories.data)
			} catch (err) {
				console.log(err)
			} finally {
				setIsLoading(false)
			}
		}
		getCategories()
	}, [])

	return (
		<List
			component='nav'
			sx={{
				width: 280,
			}}
			subheader={
				<ListSubheader
					component='div'
					sx={{
						backgroundColor: 'transparent',
						fontWeight: 'bold',
						textTransform: 'capitalize',
						lineHeight: '1.5',
						py: 2,
						position: 'relative',
					}}
				>
					Текущий фильтр: {selectedCategory.name}
				</ListSubheader>
			}
		>
			{!isLoading ? (
				parentCategories.map(parentCategory => (
					<CategoryFilterItem
						key={parentCategory.name}
						parentCategory={parentCategory}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				))
			) : (
				<CategoryFilterItem.Skeleton />
			)}
		</List>
	)
}
export default CategoryFilter
