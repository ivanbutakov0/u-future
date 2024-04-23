const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
})

const Topic = mongoose.model('Topic', CategorySchema)

module.exports = Topic
