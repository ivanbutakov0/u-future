const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createCourse, getCourse } = require('../controllers/course.controller')

const router = express.Router()

router.post('/create', authMiddleware, createCourse)
router.get('/:id', authMiddleware, getCourse)

module.exports = router
