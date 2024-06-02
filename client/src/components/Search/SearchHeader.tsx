import { Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { TCategory } from '../../types/TCategory'
import FilterModal from './FilterModal'

const SearchHeader = () => {
	const [selectedCategory, setSelectedCategory] = useState<TCategory>(
		{} as TCategory
	)
	const [selectedTopics, setSelectedTopics] = useState<string[]>([])
	const [priceFilterValue, setPriceFilterValue] = useState<number[]>([0, 10000])
	const [title, setTitle] = useState('')

	const [searchParams, setSearchParams] = useSearchParams()

	// Function to create search parameters object from component state
	const createSearchParamsObject = (): URLSearchParamsInit => {
		const params: Record<string, string | string[]> = {}

		if (title) {
			params.title = title
		}

		if (Object.keys(selectedCategory).length > 0) {
			// Build category parameter based on your category structure
			params.category = JSON.stringify(selectedCategory.name) // Example for JSON serialization
		}

		if (selectedTopics.length > 0) {
			params.topics = selectedTopics.join(',') // Join topics into a comma-separated string
		}

		if (priceFilterValue.length === 2) {
			if (priceFilterValue[0] !== 0) {
				params.price_min = priceFilterValue[0].toString()
			}

			if (priceFilterValue[1] !== 10000) {
				params.price_max = priceFilterValue[1].toString()
			}
		}

		return params
	}

	useEffect(() => {
		const newSearchParams = createSearchParamsObject()
		setSearchParams(newSearchParams) // Update URL parameters
	}, [selectedCategory, selectedTopics, priceFilterValue, title])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const title = event.target.value

		setTitle(title)
	}
	return (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent={'center'}
			gap={2}
			sx={{
				p: 2,
			}}
		>
			<TextField
				margin='normal'
				id='title'
				label='Поиск курса'
				size='small'
				onChange={handleInputChange}
				sx={{ m: 0 }}
			/>
			<FilterModal
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				selectedTopics={selectedTopics}
				setSelectedTopics={setSelectedTopics}
				priceFilterValue={priceFilterValue}
				setPriceFilterValue={setPriceFilterValue}
			/>
		</Stack>
	)
}
export default SearchHeader
