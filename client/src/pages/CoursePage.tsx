import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
} from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ChapterItem from '../components/Course/ChapterItem'
import { getCourse } from '../services/CourseService'
import { CourseResponse } from '../types/response/CourseResponse'

export type TCourseContext = {
	course: CourseResponse
	isFetching: boolean
}

export const CourseContext = createContext<TCourseContext>(null!)

const CoursePageLayout = () => {
	const [course, setCourse] = useState<CourseResponse>({} as CourseResponse)
	const [isFetching, setIsFetching] = useState<boolean>(true)
	const params = useParams()
	const navigate = useNavigate()
	const selectedChapterId = params.chapterId

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const course = await getCourse(params.id!)
				setCourse(course.data)
			} catch (err) {
				console.log(err)
			} finally {
				setIsFetching(false)
			}
		}

		fetchCourse()
	}, [])

	const handleListItemClick = () => {
		navigate(`/courses/${course._id}/home`)
	}

	return (
		<CourseContext.Provider value={{ course, isFetching }}>
			<Stack
				component='section'
				direction={'row'}
				gap={1}
				sx={{ py: 4, minHeight: '90vh' }}
			>
				<Box component='div' sx={{ flex: 3 }}>
					<Outlet />
				</Box>
				<Divider orientation='vertical' flexItem />
				<Box component='div' sx={{ flex: 1 }}>
					<List component={'nav'}>
						<ListItem disablePadding>
							<ListItemButton
								selected={!selectedChapterId}
								onClick={handleListItemClick}
							>
								<ListItemText primary='Главная' />
							</ListItemButton>
						</ListItem>
						{isFetching &&
							Array(5)
								.fill(null)
								.map((_, index) => <ChapterItem.Skeleton key={index} />)}
						{course.chapters?.map(
							chapter =>
								chapter.isPublished && (
									<ChapterItem
										key={chapter._id}
										chapter={chapter}
										selected={chapter._id === selectedChapterId}
									/>
								)
						)}
					</List>
				</Box>
			</Stack>
		</CourseContext.Provider>
	)
}
export default CoursePageLayout
