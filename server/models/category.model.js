const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		courses: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Course',
			required: false,
		},
	},
	{ timestamps: true }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
