const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{ timestamps: true }
)

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic
