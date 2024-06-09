const { Cursor } = require('mongoose')
const Course = require('../models/course.model')
const Topic = require('../models/topic.model')
const { errorHandler } = require('../utils/error')
const { getAllParentCategories } = require('../controllers/category.controller')
const Category = require('../models/category.model')
const ParentCategory = require('../models/parentCategory.model')

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
	const courses = await Course.find({ ...params, isPublished: true }).populate(
		'topics'
	)
	return courses
}

const deleteCourseService = async id => {
	const deletedCourse = await Course.findByIdAndDelete(id)
	return deletedCourse
}

const getCoursesByParentCategoryService = async (category, limit) => {
	const parentCategory = await ParentCategory.find({
		name: category,
	})

	if (!parentCategory) {
		throw errorHandler(404, 'Категория не найдена')
	}

	const suitCategories = parentCategory.map(parent => parent.categories).flat()

	const courses = await Course.find({
		category: { $in: suitCategories },
		isPublished: true,
	})
		.limit(limit === 0 ? undefined : limit)
		.populate('topics')
	return courses
}

module.exports = {
	createCourseService,
	getCourseService,
	editCourseService,
	getTeacherCoursesService,
	getCoursesByParamsService,
	deleteCourseService,
	getCoursesByParentCategoryService,
}
