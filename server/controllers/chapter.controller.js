const {
	createChapterService,
	updateChapterService,
} = require('../services/chapter.servise')
const { getCourseService } = require('../services/course.servise')

const createChapter = async (req, res, next) => {
	try {
		const { title, courseId } = req.body
		const userId = req.user.id

		if (!title || !courseId) {
			throw new Error('Title and course id are required')
		}

		const course = await getCourseService(courseId)

		if (!course) {
			throw new Error('Course not found')
		} else if (course.userId.toString() !== userId) {
			console.log('course.userId: ', course.userId, 'userId: ', userId)
			throw new Error('You are not allowed to create chapters in this course')
		}

		const chapterPosition = course.chapters.length + 1

		const newChapter = await createChapterService(
			title,
			courseId,
			chapterPosition
		)
		res.json(newChapter)
	} catch (err) {
		next(err)
	}
}

const reorderChapter = async (req, res, next) => {
	try {
		const { updateData } = req.body

		if (!updateData) {
			throw new Error('Update data is required')
		}

		// TODO: check if user is the owner of the course

		updateData.forEach(async updateData => {
			await updateChapterService(updateData)
		})
		res.status(200).json({ success: true })
	} catch (err) {
		next(err)
	}
}

module.exports = { createChapter, reorderChapter }
