const Course = require('../models/course.model')
const { errorHandler } = require('../utils/error')

const createCourseService = async (title, userId) => {
	const course = await Course.create({
		title,
		userId,
	})
	return course
}

const getCourseService = async id => {
	const course = await Course.findById(id)
	if (!course) {
		throw errorHandler(404, 'Курс не найден')
	}
	return course
}

module.exports = { createCourseService, getCourseService }
