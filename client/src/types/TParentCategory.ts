import { TCategory } from './TCategory'

export type ParentCategory = {
	_id: string
	name: string
	categories: TCategory[]
	createdAt: string
	updatedAt: string
}
