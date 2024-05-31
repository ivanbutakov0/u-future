const Category = require('../models/category.model')
const ParentCategory = require('../models/parentCategory.model')
const Topic = require('../models/topic.model')

/**
 * Creates multiple topics in the database.
 *
 * @param {Array<string>} names - An array of topic names to create.
 * @param {string} categoryId - The ID of the category to create the topics in.
 * @return {Promise<void>} A promise that resolves when all topics have been created.
 */
const createTopics = async names => {
	for (const name of names) {
		await Topic.create({ name })
	}
}

/**
 * Deletes all topics from the database.
 *
 * @return {Promise<void>} A promise that resolves when all topics have been deleted.
 */
const deleteAllTopics = async () => {
	await Topic.deleteMany({})
}

/**
 * Adds topics to a category in the database.
 *
 * @param {Array<string>} names - An array of topic names to add.
 * @param {string} categoryId - The ID of the category to add the topics to.
 * @return {Promise<void>} A promise that resolves when all topics have been added to the category.
 */
const addTopicsToCategory = async (names, categoryId) => {
	const category = await Category.findById(categoryId)
	if (category.allowedTopics.length > 0) {
		console.log('Wrong category')
		return
	}
	for (const name of names) {
		const topic = await Topic.find({ name })
		category.allowedTopics.push(topic[0]._id)
		await category.save()
	}
}

const getCategory = async categoryId => {
	const category = await Category.findById(categoryId).populate('allowedTopics')
	console.log(category)
}

/**
 * Creates a parent category in the database.
 *
 * @param {string} name - The name of the parent category to create.
 * @return {Promise<void>} A promise that resolves when the parent category has been created.
 */
const createParentCategory = async name => {
	const parentCategory = await ParentCategory.create({ name })
	return parentCategory
}

/**
 * Creates multiple categories in the database.
 *
 * @param {Array<string>} names - An array of category names to create.
 * @param {string} parentId - The ID of the parent category to create the categories under.
 * @return {Promise<void>} A promise that resolves when all categories have been created.
 */
const createCategories = async (names, parentId) => {
	const parentCategory = await ParentCategory.findById(parentId)
	for (const name of names) {
		const category = await Category.create({ name })
		parentCategory.categories.push(category)
		await parentCategory.save()
	}
}

module.exports = {
	createTopics,
	addTopicsToCategory,
	deleteAllTopics,
	getCategory,
	createParentCategory,
	createCategories,
}
