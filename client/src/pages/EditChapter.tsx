import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import TitleForm from '../components/EditChapter/TitleForm'
import { RootState } from '../redux/store'
import { editChapterService, getChapterById } from '../services/ChapterService'
import { TChapter } from '../types/TChapter'

const EditChapter = () => {
	const { courseId, chapterId } = useParams()
	const [chapter, setChapter] = useState<TChapter | null>(null)
	const user = useSelector((state: RootState) => state.user.currentUser)
	const navigate = useNavigate()

	if (!user) {
		toast.error('Не авторизован')
		navigate('/')
	}

	useEffect(() => {
		const fetchChapter = async () => {
			try {
				const chapter = await getChapterById(chapterId!)
				setChapter(chapter.data)
			} catch (err) {
				console.log('error', err)
				toast.error('Глава не найдена')
				navigate('/')
			}
		}
		fetchChapter()
	}, [])

	useEffect(() => {
		const editChapter = async () => {
			try {
				if (chapter) {
					await editChapterService(chapter._id, chapter)
				}
			} catch (err) {
				console.log(err)
				toast.error('Произошла ошибка при редактировании главы')
			}
		}

		editChapter()
	}, [chapter])

	return (
		// TODO: create chapter title form
		<TitleForm initialData={chapter} setData={setChapter} />

		// TODO: create chapter description form

		// TODO: create chapter video url form
	)
}
export default EditChapter
