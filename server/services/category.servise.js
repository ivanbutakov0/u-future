const Category = require('../models/category.model')
const ParentCategory = require('../models/parentCategory.model')

const createCategoryService = async name => {
	const category = await Category.create({ name })
	return category
}

const getAllParentCategoriesService = async () => {
	const parentCategories = await ParentCategory.find().populate({
		path: 'categories',
		populate: 'allowedTopics',
	})
	return parentCategories
}

module.exports = { createCategoryService, getAllParentCategoriesService }
