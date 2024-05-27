const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const {
	createCourse,
	getCourse,
	editCourse,
	getTeacherCourses,
} = require('../controllers/course.controller')

const router = express.Router()

router.get('/getTeacherCourses/:teacherId', authMiddleware, getTeacherCourses)
router.get('/:id', authMiddleware, getCourse)
router.post('/create', authMiddleware, createCourse)
router.put('/edit/:id', authMiddleware, editCourse)

module.exports = router
