const mongoose = require('mongoose')

const ChapterSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		videoUrl: {
			type: String,
		},
		position: {
			type: Number,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		isFree: {
			type: Boolean,
			default: false,
		},
		muxData: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'MuxData',
		},
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
			required: true,
		},
		userProgress: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'UserProgress',
		},
	},
	{ timestamps: true }
)

const Chapter = mongoose.model('Chapter', ChapterSchema)

module.exports = Chapter
