const express = require('express')
const {
	createCategory,
	getAllParentCategories,
} = require('../controllers/category.controller')

const router = express.Router()

router.post('/create', createCategory)
router.get('/parent/getAll', getAllParentCategories)

module.exports = router
