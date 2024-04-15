const Course = require('../models/course.model')

const createCourseService = async (title, userId) => {
	const course = await Course.create({
		title,
		userId,
	})
	return course
}

module.exports = { createCourseService }
