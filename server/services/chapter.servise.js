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

const getChapterByIdService = async id => {
	return await Chapter.findById(id)
}

const editChapterService = async (chapterId, data) => {
	const editedChapter = await Chapter.findByIdAndUpdate(chapterId, data, {
		new: true,
	})

	if (!editedChapter) {
		throw new Error('Chapter not found')
	}

	return editedChapter
}

module.exports = {
	createChapterService,
	updateChapterService,
	getChapterByIdService,
	editChapterService,
}
