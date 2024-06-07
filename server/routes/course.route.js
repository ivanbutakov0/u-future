const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const {
	createCourse,
	getCourse,
	editCourse,
	getTeacherCourses,
	getCoursesByParams,
	deleteCourse,
} = require('../controllers/course.controller')

const router = express.Router()

router.get('/getTeacherCourses/:teacherId', authMiddleware, getTeacherCourses)
router.get('/:id', getCourse)
router.post('/create', authMiddleware, createCourse)
router.put('/edit/:id', authMiddleware, editCourse)
router.get(
	'/search/:title/:price_min/:price_max/:category/:topics',
	getCoursesByParams
)
router.delete('/delete/:courseId/:userId', authMiddleware, deleteCourse)

module.exports = router
