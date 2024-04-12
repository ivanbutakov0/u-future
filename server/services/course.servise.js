const Course = require('../models/course.model')
const { errorHandler } = require('../utils/error')

const createCourseService = async (title, userId) => {
	const category = await Course.findOne({ _id: categoryId })

	if (!category) {
		return errorHandler(404, 'Категория не найдена')
	}

	const course = await Course.create({
		title,
		description,
		imageUrl,
		price,
		userId,
		categoryId,
	})
	return course
}

module.exports = { createCourseService }
