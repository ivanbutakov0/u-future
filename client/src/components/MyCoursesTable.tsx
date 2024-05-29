import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Chip, List, ListItem, Popover, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import * as React from 'react'
import { CourseResponse } from '../types/response/CourseResponse'
import CustomLink from './ui/CustomLink'

type Data = CourseResponse & { options: string }

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
	array: readonly CourseResponse[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

interface HeadCell {
	disablePadding: boolean
	id: keyof Data
	label: string
	numeric: boolean
}

const headCells: readonly HeadCell[] = [
	{
		id: 'title',
		numeric: false,
		disablePadding: true,
		label: 'Title',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'isPublished',
		numeric: false,
		disablePadding: false,
		label: 'Published',
	},
	{
		id: 'options',
		numeric: false,
		disablePadding: false,
		label: '',
	},
]

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void
	order: Order
	orderBy: string
	rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
						style={{ fontWeight: 'bold' }}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

type MyCoursesTableProps = {
	courses: CourseResponse[]
}

export default function MyCoursesTable({ courses }: MyCoursesTableProps) {
	const [order, setOrder] = React.useState<Order>('asc')
	const [orderBy, setOrderBy] = React.useState<keyof Data>('price')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false)
	const [selectedCourseId, setSelectedCourseId] = React.useState<
		string | number
	>(0)
	const moreIconRef = React.useRef<HTMLElement | null>(null)

	const handleMoreIconClick = (
		e: React.MouseEvent<HTMLElement>,
		courseId: number | string
	) => {
		setSelectedCourseId(courseId)
		moreIconRef.current = e.currentTarget
		setIsPopoverOpen(prev => !prev)
	}
	const handlePopoverClose = () => {
		setIsPopoverOpen(false)
	}

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0

	const visibleRows = stableSort(courses, getComparator(order, orderBy)).slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	)

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={courses.length}
						/>
						<TableBody>
							{visibleRows.map((course, index) => {
								return (
									<TableRow hover tabIndex={-1} key={course._id}>
										<TableCell>{course.title}</TableCell>
										<TableCell>{course.price}</TableCell>
										<TableCell>
											{course.isPublished ? (
												<Chip color='info' label='Опубликована' size='small' />
											) : (
												<Chip color='error' label='Черновик' size='small' />
											)}
										</TableCell>
										<TableCell>
											<Box
												component={'div'}
												ref={moreIconRef}
												onClick={event =>
													handleMoreIconClick(event, course._id)
												}
												sx={{ cursor: 'pointer', display: 'inline-block' }}
											>
												<MoreHorizIcon />
											</Box>
											<Popover
												anchorEl={moreIconRef.current}
												open={isPopoverOpen}
												onClose={handlePopoverClose}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'left',
												}}
												PaperProps={{
													sx: { boxShadow: 'none', border: '1px solid #ccc' },
												}}
											>
												<List disablePadding>
													<ListItem sx={{ p: 1 }}>
														<CustomLink
															to={`/teachers/edit/${selectedCourseId}`}
															styles={{
																display: 'flex',
																alignItems: 'center',
																gap: 1,
																fontSize: '14px',
															}}
														>
															<EditIcon fontSize='small' />
															Редактировать
														</CustomLink>
													</ListItem>
												</List>
											</Popover>
										</TableCell>
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
								<TableRow>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={courses.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}

MyCoursesTable.Skeleton = function MyCourseTableSkeleton() {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>
						<Skeleton variant='text' />
					</TableCell>
					<TableCell>
						<Skeleton variant='text' />
					</TableCell>
					<TableCell>
						<Skeleton variant='text' />
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{Array.from({ length: 5 }).map((_, index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton variant='text' />
						</TableCell>
						<TableCell>
							<Skeleton variant='text' />
						</TableCell>
						<TableCell>
							<Skeleton variant='text' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
