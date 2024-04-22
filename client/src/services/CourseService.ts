import { AxiosResponse } from 'axios'
import api from '../http'
import { CourseResponse } from '../types/response/CourseResponse'

export const createCourse = async (
	title: string,
	userId: string
): Promise<AxiosResponse<CourseResponse>> => {
	return api.post<CourseResponse>('/course/create', { title, userId })
}

export const getCourse = async (
	courseId: string
): Promise<AxiosResponse<CourseResponse>> => {
	return api.get<CourseResponse>(`/course/${courseId}`)
}

export const editCourseService = async (
	id: string,
	data: CourseResponse
): Promise<AxiosResponse<CourseResponse>> => {
	return api.put<CourseResponse>(`/course/edit/${id}`, data)
}
