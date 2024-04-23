const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrl: {
			type: String,
		},
		price: {
			type: Number,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},

		topics: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Topic',
		},
	},
	{ timestamps: true }
)

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course
