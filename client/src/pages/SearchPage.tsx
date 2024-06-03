import {
	Box,
	Divider,
	Grid,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	SelectChangeEvent,
	Skeleton,
	Stack,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/Search/CourseCard'
import SearchHeader from '../components/Search/SearchHeader'
import { getCoursesByParams } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

const COURSES_PER_PAGE_OPTIONS = [10, 25, 50, 100]

const SearchPage = () => {
	const [courses, setCourses] = useState<CourseResponse[]>([])
	const [searchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [coursesPerPage, setCoursesPerPage] = useState(
		COURSES_PER_PAGE_OPTIONS[0]
	)

	const title = searchParams.get('title')
	const priceMin = searchParams.get('price_min')
	const priceMax = searchParams.get('price_max')
	const category = searchParams.get('category')
	const topics = searchParams.get('topics')

	useEffect(() => {
		setIsFetching(true)
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
			} finally {
				setIsFetching(false)
			}
		}

		const timeOut = setTimeout(fetchCourses, 1500)

		return () => clearTimeout(timeOut)
	}, [title, priceMin, priceMax, category, topics])

	const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleCoursesPerPageChange = (event: SelectChangeEvent<number>) => {
		setCoursesPerPage(parseInt(event.target.value as string, 10)) // Convert to number
		setCurrentPage(1) // Reset to first page when courses per page change
	}

	const totalPages = Math.ceil(courses.length / coursesPerPage) // Calculate total pages

	return (
		<Box component={'section'}>
			<SearchHeader />
			<Divider />
			{isFetching ? (
				<Grid container spacing={2} sx={{ my: 2 }}>
					{/* Render skeletons for each course slot */}
					{Array.from({ length: coursesPerPage }).map((_, index) => (
						<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
							<Skeleton
								variant='rectangular'
								width='100%'
								height={140}
								sx={{ mb: 1 }}
							/>
							<Skeleton variant='text' width='50%' height={50} />
							<Skeleton variant='text' width='80%' />
							<Skeleton variant='text' width='50%' />
							<Skeleton variant='text' width='60%' />
						</Grid>
					))}
				</Grid>
			) : (
				<Grid
					container
					spacing={2}
					sx={{ my: 2, justifyContent: 'center', mx: 'auto', width: '100%' }}
				>
					{courses
						.slice(
							(currentPage - 1) * coursesPerPage,
							currentPage * coursesPerPage
						)
						.map(course => (
							<Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
								<CourseCard course={course} />
							</Grid>
						))}
				</Grid>
			)}

			<Divider />
			<Grid
				container
				justifyContent='space-around'
				alignItems='center'
				sx={{ py: 2 }}
			>
				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
						color='primary'
						variant='outlined'
						sx={{ mr: 2 }} // Add margin to the right
					/>
				)}
				<Stack direction='row' spacing={1} alignItems='center'>
					<InputLabel id='courses-per-page-label'>Курсы на странице</InputLabel>
					<Select
						labelId='courses-per-page-label'
						value={coursesPerPage}
						onChange={handleCoursesPerPageChange}
						size='small'
					>
						{COURSES_PER_PAGE_OPTIONS.map(option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</Stack>
			</Grid>
		</Box>
	)
}
export default SearchPage
