const { createChapterService } = require('../services/chapter.servise')

const createChapter = async (req, res, next) => {
	try {
		const { title, courseId } = req.body

		if (!title || !courseId) {
			throw new Error('Title and course id are required')
		}

		const newChapter = await createChapterService(title, courseId)
		res.json(newChapter)
	} catch (err) {
		next(err)
	}
}

module.exports = { createChapter }
