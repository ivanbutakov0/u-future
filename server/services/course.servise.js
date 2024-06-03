const { Cursor } = require('mongoose')
const Course = require('../models/course.model')
const Topic = require('../models/topic.model')
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
		.populate({
			path: 'category',
			populate: 'allowedTopics',
		})
		.populate('topics')
		.populate('chapters')

	if (!course) {
		throw errorHandler(404, 'Курс не найден')
	}

	course.chapters.sort((a, b) => a.position - b.position)

	return course
}

const editCourseService = async (id, data) => {
	const editedCourse = await Course.findByIdAndUpdate(id, data, {
		new: true,
	})

	if (!editedCourse) {
		throw errorHandler(404, 'Курс не найден')
	}

	return editedCourse
}

const getTeacherCoursesService = async teacherId => {
	const courses = await Course.find({ userId: teacherId })
	return courses
}

const getCoursesByParamsService = async params => {
	const courses = await Course.find(params)
	return courses
}

module.exports = {
	createCourseService,
	getCourseService,
	editCourseService,
	getTeacherCoursesService,
	getCoursesByParamsService,
}
