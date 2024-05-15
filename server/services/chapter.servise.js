const Chapter = require('../models/chapter.model')

const createChapterService = async (title, courseId, chapterPosition) => {
	return await Chapter.create({
		title,
		course: courseId,
		position: chapterPosition,
	})
}

const updateChapterService = async updateData => {
	const { id, position } = updateData
	await Chapter.findByIdAndUpdate(id, { position })
}

module.exports = { createChapterService, updateChapterService }
