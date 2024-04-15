const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createCourse, editCourse } = require('../controllers/course.controller')

const router = express.Router()

router.post('/create', authMiddleware, createCourse)
router.get('/edit/:id', authMiddleware, editCourse)

module.exports = router
