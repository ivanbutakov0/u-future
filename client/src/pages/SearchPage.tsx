import { Box, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchHeader from '../components/Search/SearchHeader'
import { getCoursesByParams } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const SearchPage = () => {
	const [courses, setCourses] = useState<CourseResponse[]>([])
	const [searchParams] = useSearchParams()

	const title = searchParams.get('title')
	const priceMin = searchParams.get('price_min')
	const priceMax = searchParams.get('price_max')
	const category = searchParams.get('category')
	const topics = searchParams.get('topics')

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const courses = await getCoursesByParams(
					title,
					priceMin,
					priceMax,
					category,
					topics
				)

				setCourses(courses.data)
			} catch (err) {
				console.log(err)
			}
		}

		const timeOut = setTimeout(fetchCourses, 3000)

		return () => clearTimeout(timeOut)
	}, [title, priceMin, priceMax, category, topics])

	return (
		<Box component={'section'}>
			<SearchHeader />
			<Divider />
		</Box>
	)
}
export default SearchPage
