const mongoose = require('mongoose')

const ParentCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		categories: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Category',
			required: false,
		},
	},
	{ timestamps: true }
)

const ParentCategory = mongoose.model('Category', ParentCategorySchema)

module.exports = ParentCategory
