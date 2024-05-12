const mongoose = require('mongoose')

const UserProgressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		chapterId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chapter',
			required: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true }
)

const UserProgress = mongoose.model('UserProgress', UserProgressSchema)

module.exports = UserProgress
