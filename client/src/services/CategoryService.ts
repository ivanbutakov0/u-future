import { AxiosResponse } from 'axios'
import api from '../http'
import { ParentCategory } from '../types/TParentCategory'

export const getAllParentCategories = async (): Promise<
	AxiosResponse<ParentCategory[]>
> => {
	return api.get<ParentCategory[]>('/category/parent/getAll')
}
