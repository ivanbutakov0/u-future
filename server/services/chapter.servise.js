const Chapter = require('../models/chapter.model')

const createChapterService = async (title, courseId) => {
	return await Chapter.create({ title, course: courseId })
}

module.exports = { createChapterService }
