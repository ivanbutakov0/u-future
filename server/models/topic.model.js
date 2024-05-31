const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic
