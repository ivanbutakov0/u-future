import { CourseResponse } from '../response/CourseResponse'

export type cartSliceTypes = {
	items: CourseResponse[]
	isLoading: boolean
	error: string | null
}
