import { CourseResponse } from './response/CourseResponse'

export type Category = {
	_id: string
	courses: CourseResponse[]
	name: string
	updatedAt: string
	createdAt: string
}
