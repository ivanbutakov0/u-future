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
