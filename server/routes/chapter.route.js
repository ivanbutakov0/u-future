const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createChapter } = require('../controllers/chapter.controller')

const router = express.Router()

router.post('/create', authMiddleware, createChapter)

module.exports = router
