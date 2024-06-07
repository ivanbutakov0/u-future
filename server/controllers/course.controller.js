const {
	createCourseService,
	getCourseService,
	editCourseService,
	getTeacherCoursesService,
	getCoursesByParamsService,
	deleteCourseService,
} = require('../services/course.servise')

const createCourse = async (req, res, next) => {
	try {
		const { title, userId } = req.body
		// TODO: we can get userId from client or from req.user
		const course = await createCourseService(title, userId)
		res.json(course)
	} catch (err) {
		next(err)
	}
}

const getCourse = async (req, res, next) => {
	const { id } = req.params

	try {
		const course = await getCourseService(id)
		res.json(course)
	} catch (err) {
		next(err)
	}
}

const editCourse = async (req, res, next) => {
	try {
		const { id } = req.params
		const data = req.body

		const editedCourse = await editCourseService(id, data)
		res.json(editedCourse)
	} catch (err) {
		next(err)
	}
}

const getTeacherCourses = async (req, res, next) => {
	const { teacherId } = req.params
	try {
		const courses = await getTeacherCoursesService(teacherId)
		res.json(courses)
	} catch (err) {
		next(err)
	}
}

const getCoursesByParams = async (req, res, next) => {
	const filteredParams = Object.fromEntries(
		Object.entries(req.params).filter(([key, value]) => value !== 'null')
	)
	try {
		const courses = await getCoursesByParamsService(filteredParams)
		res.json(courses)
	} catch (err) {
		next(err)
	}
}

const deleteCourse = async (req, res, next) => {
	const { courseId, userId } = req.params

	try {
		const course = await getCourseService(courseId)

		if (course.userId.toString() !== userId.toString()) {
			return res.status(401).json({ message: 'You can not delete this course' })
		}

		const deletedCourse = await deleteCourseService(courseId)
		res.json(deletedCourse)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	createCourse,
	getCourse,
	editCourse,
	getTeacherCourses,
	getCoursesByParams,
	deleteCourse,
}
