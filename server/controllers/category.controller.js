const {
	createCategoryService,
	getAllParentCategoriesService,
} = require('../services/category.servise')

const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body
		const category = await createCategoryService(name)

		res.json(category)
	} catch (err) {
		next(err)
	}
}

const getAllParentCategories = async (req, res, next) => {
	try {
		const parentCategories = await getAllParentCategoriesService()
		res.json(parentCategories)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = { createCategory, getAllParentCategories }
