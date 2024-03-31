const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')

const generateTokens = async payload => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15m',
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '30d',
	})

	return {
		accessToken,
		refreshToken,
	}
}

const saveToken = async (userId, refreshToken) => {
	const tokenData = await Token.findOne({ user: userId })
	if (tokenData) {
		tokenData.refreshToken = refreshToken
		const saveToken = await tokenData.save()
		return saveToken
	}
	const token = await Token.create({ user: userId, refreshToken })
	return token
}

const removeToken = async refreshToken => {
	const tokenData = await Token.deleteOne({ refreshToken })
	return tokenData
}

const validateAccessToken = async token => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		return userData
	} catch (err) {
		return null
	}
}

const validateRefreshToken = async token => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		return userData
	} catch (err) {
		return null
	}
}

const findToken = async refreshToken => {
	const tokenData = await Token.findOne({ refreshToken })
	return tokenData
}

module.exports = {
	generateTokens,
	saveToken,
	removeToken,
	validateAccessToken,
	validateRefreshToken,
	findToken,
}
