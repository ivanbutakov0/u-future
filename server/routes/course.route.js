const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createCourse } = require('../controllers/course.controller')

const router = express.Router()

router.post('/create', authMiddleware, createCourse)

module.exports = router
