import { AxiosResponse } from 'axios'
import api from '../http'
import { TChapter } from '../types/TChapter'

export const createChapter = async (
	title: string,
	courseId: string
): Promise<AxiosResponse<TChapter>> => {
	return api.post<TChapter>('/chapter/create', { title, courseId })
}

export const reorderChapter = async (
	updateData: { id: string; position: number }[]
): Promise<AxiosResponse<TChapter>> => {
	return api.put<TChapter>('/chapter/reorder', { updateData })
}

export const getChapterById = async (
	chapterId: string
): Promise<AxiosResponse<TChapter>> => {
	return api.get<TChapter>(`/chapter/${chapterId}`)
}

export const editChapterService = async (
	id: string,
	data: TChapter
): Promise<AxiosResponse<TChapter>> => {
	return api.put<TChapter>(`/chapter/edit/${id}`, data)
}
