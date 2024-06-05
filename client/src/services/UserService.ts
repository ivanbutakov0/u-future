import { AxiosResponse } from 'axios'
import api from '../http'
import { TUser } from '../types/TUser'

export const fetchUsers = async (): Promise<AxiosResponse<TUser[]>> => {
	return api.get<TUser[]>('/user/')
}

export const updateUser = async (
	id: string,
	data: Partial<TUser>
): Promise<AxiosResponse<TUser>> => {
	return api.patch<TUser>(`/user/update`, { id, data })
}

export const addCourseToCart = async (
	id: string,
	courseId: string
): Promise<AxiosResponse<TUser>> => {
	return api.patch<TUser>(`/user/update-cart`, { id, courseId })
}
