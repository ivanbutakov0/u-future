import { TCategory } from '../TCategory'

export type CourseResponse = {
	id: string
	title: string
	description?: string
	userId: string
	imageUrl?: string
	price?: number
	isPublished: boolean
	category?: TCategory
	createdAt: string
	updatedAt: string
}
