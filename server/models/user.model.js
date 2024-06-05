const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		backgroundAvatar: {
			type: String,
			required: true,
		},
		boughtCourses: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Course',
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
