import { Category } from './TCategory'

export type ParentCategory = {
	_id: string
	name: string
	categories: Category[]
	createdAt: string
	updatedAt: string
}
