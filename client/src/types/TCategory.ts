import { CourseResponse } from './response/CourseResponse'
import { TTopic } from './TTopic'

export type TCategory = {
	_id: string
	courses: CourseResponse[]
	allowedTopics: TTopic[]
	name: string
	updatedAt: string
	createdAt: string
}
