const {
	createCategoryService,
	getAllParentCategoriesService,
} = require('../services/category.servise')

const createCategory = async (req, res) => {
	try {
		const { name } = req.body
		const category = await createCategoryService(name)

		res.json(category)
	} catch (err) {
		next(err)
	}
}

const getAllParentCategories = async (req, res) => {
	try {
		const parentCategories = await getAllParentCategoriesService()
		res.json(parentCategories)
	} catch (err) {
		next(err)
	}
}

module.exports = { createCategory, getAllParentCategories }
