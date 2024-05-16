const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const {
	createChapter,
	reorderChapter,
	getChapterById,
	editChapter,
} = require('../controllers/chapter.controller')

const router = express.Router()

router.post('/create', authMiddleware, createChapter)
router.put('/reorder', authMiddleware, reorderChapter)
router.get('/:chapterId', authMiddleware, getChapterById)
router.put('/edit/:chapterId', authMiddleware, editChapter)

module.exports = router
