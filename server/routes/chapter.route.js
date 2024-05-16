const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const {
	createChapter,
	reorderChapter,
	getChapterById,
} = require('../controllers/chapter.controller')

const router = express.Router()

router.post('/create', authMiddleware, createChapter)
router.put('/reorder', authMiddleware, reorderChapter)
router.get('/:chapterId', authMiddleware, getChapterById)

module.exports = router
