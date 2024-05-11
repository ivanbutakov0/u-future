import { TCategory } from '../TCategory'
import { TTopic } from '../TTopic'

export type CourseResponse = {
	_id: string
	title: string
	description?: string
	userId: string
	imageUrl?: string
	price?: number
	isPublished: boolean
	category?: TCategory
	topics?: TTopic[]
	createdAt: string
	updatedAt: string
}
