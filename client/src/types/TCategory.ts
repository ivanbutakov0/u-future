import { CourseResponse } from './response/CourseResponse'

export type TCategory = {
	_id: string
	courses: CourseResponse[]
	name: string
	updatedAt: string
	createdAt: string
}
