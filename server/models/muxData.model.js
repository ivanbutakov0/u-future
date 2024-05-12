const mongoose = require('mongoose')

const MuxDataSchema = new mongoose.Schema({
	assetId: {
		type: String,
		required: true,
	},
	playBack: {
		type: String,
	},
	chapterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chapter',
		required: true,
	},
})

const MuxData = mongoose.model('MuxData', MuxDataSchema)

module.exports = MuxData
