const Category = require('../models/category.model')

const createCategoryService = async name => {
	const category = await Category.create({ name })
	return category
}

module.exports = { createCategoryService }
