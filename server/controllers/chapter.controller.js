const { createChapterService } = require('../services/chapter.servise')
const { getCourseService } = require('../services/course.servise')

const createChapter = async (req, res, next) => {
	try {
		const { title, courseId } = req.body

		if (!title || !courseId) {
			throw new Error('Title and course id are required')
		}

		const course = await getCourseService(courseId)

		if (!course) {
			throw new Error('Course not found')
		}

		const newChapter = await createChapterService(title, courseId)
		res.json(newChapter)
	} catch (err) {
		next(err)
	}
}

module.exports = { createChapter }
