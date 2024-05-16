import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../redux/store'

const EditChapter = () => {
	const { courseId, chapterId } = useParams()
	const user = useSelector((state: RootState) => state.user.currentUser)
	const navigate = useNavigate()

	if (!user) {
		toast.error('Не авторизован')
		navigate('/')
	}

	return <div>EditChapter</div>
}
export default EditChapter
