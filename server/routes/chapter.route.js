const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createChapter, reorderChapter } = require('../controllers/chapter.controller')

const router = express.Router()

router.post('/create', authMiddleware, createChapter)
router.put('/reorder', authMiddleware, reorderChapter)

module.exports = router
