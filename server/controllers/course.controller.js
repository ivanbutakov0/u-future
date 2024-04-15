const {
	createCourseService,
	getCourseService,
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

const editCourse = async (req, res, next) => {
	const { id } = req.params

	try {
		const course = getCourseService(id)
		res.json(course)
	} catch (err) {
		next(err)
	}
}

module.exports = { createCourse, editCourse }
