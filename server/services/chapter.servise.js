const createChapterService = async (title, courseId) => {
	return await Chapter.create({ title, courseId })
}

module.exports = { createChapterService }
