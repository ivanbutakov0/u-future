import { CourseResponse } from './response/CourseResponse'
import { TChapter } from './TChapter'

export type TUser = {
	_id: string
	username: string
	email: string
	avatar: string
	backgroundAvatar: string
	createdAt: string
	updatedAt: string
	money: number
	boughtCourses: CourseResponse[]
	cart: CourseResponse[]
	finishedChapters: TChapter[]
}
