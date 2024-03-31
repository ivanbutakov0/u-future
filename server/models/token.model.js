const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token
