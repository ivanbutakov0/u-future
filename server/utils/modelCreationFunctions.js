const Category = require('../models/category.model')
const Topic = require('../models/topic.model')

/**
 * Creates multiple topics in the database.
 *
 * @param {Array<string>} names - An array of topic names to create.
 * @param {string} categoryId - The ID of the category to create the topics in.
 * @return {Promise<void>} A promise that resolves when all topics have been created.
 */
const createTopics = async (names, categoryId) => {
	const category = await Category.findById(categoryId)
	for (const name of names) {
		await Topic.create({ name, category })
	}
}

/**
 * Adds a topic to a category in the database.
 *
 * @param {string} categoryId - The ID of the category to add the topic to.
 * @return {Promise<void>} A promise that resolves when the topic has been added to the category.
 */
const addTopicToCategory = async categoryId => {
	const category = await Category.findById(categoryId)
	const topics = await Topic.find({ category })
	for (const topic of topics) {
		category.allowedTopics.push(topic)
		await category.save()
	}
}

const getCategory = async categoryId => {
	const category = await Category.findById(categoryId).populate('allowedTopics')
	console.log(category)
}

const deleteAllTopics = async () => {
	await Topic.deleteMany({})
}

module.exports = {
	createTopics,
	deleteAllTopics,
	addTopicToCategory,
	getCategory,
}
