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

export const getTeacherCourses = async (
	teacherId: string
): Promise<AxiosResponse<CourseResponse[]>> => {
	return api.get<CourseResponse[]>(`/course/getTeacherCourses/${teacherId}`)
}

export const getCoursesByParams = async (
	title: string | null,
	price_min: string | null,
	price_max: string | null,
	category: string | null,
	topics: string | null
): Promise<AxiosResponse<CourseResponse[]>> => {
	return api.get<CourseResponse[]>(
		`/course/search/${title}/${price_min}/${price_max}/${category}/${topics}`
	)
}

export const deleteCourse = async (
	courseId: string,
	userId: string
): Promise<AxiosResponse<CourseResponse>> => {
	return api.delete<CourseResponse>(`/course/delete/${courseId}/${userId}`)
}
