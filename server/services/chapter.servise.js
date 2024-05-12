const Chapter = require('../models/chapter.model')

const createChapterService = async (title, courseId, chapterPosition) => {
	return await Chapter.create({
		title,
		course: courseId,
		position: chapterPosition,
	})
}

module.exports = { createChapterService }
