import { AxiosResponse } from 'axios'
import api from '../http'
import { CourseResponse } from '../types/response/CourseResponse'

export const createCourse = async (
	title: string,
	userId: string
): Promise<AxiosResponse<CourseResponse>> => {
	return api.post<CourseResponse>('/course/create', { title, userId })
}
