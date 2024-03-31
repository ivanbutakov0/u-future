const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {
	generateTokens,
	saveToken,
	removeToken,
	validateRefreshToken,
	findToken,
} = require('./token.servise')
const Token = require('../models/token.model')
const { errorHandler } = require('../utils/error')

const registerUser = async (username, email, password) => {
	const candidate = await User.findOne({ email })
	if (candidate) {
		return errorHandler(409, 'Пользователь с таким email уже существует')
	}

	const hashedPassword = await bcrypt.hash(password, 5)
	const user = await User.create({ username, email, password: hashedPassword })
	const tokens = await generateTokens({ id: user._id })
	await saveToken(user._id, tokens.refreshToken)

	const { password: pass, ...userData } = user._doc

	return {
		...tokens,
		userData,
	}
}

const loginUser = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error('Пользователь с таким email не найден')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		return errorHandler(401, 'Неверный пароль')
	}

	const tokens = await generateTokens({ id: user._id })
	await saveToken(user._id, tokens.refreshToken)

	const { password: pass, ...userData } = user._doc
	return {
		...tokens,
		userData,
	}
}

const logoutService = async refreshToken => {
	const token = removeToken(refreshToken)
	return token
}

const refreshService = async refreshToken => {
	if (!refreshToken) {
		throw errorHandler(401, 'Нужно авторизоваться')
	}
	const userData = await validateRefreshToken(refreshToken)
	const tokenFromDb = await findToken(refreshToken)
	if (!userData || !tokenFromDb) {
		throw errorHandler(401, 'Нужно авторизоваться')
	}

	const user = await User.findById(userData.id)
	const tokens = await generateTokens({ id: user._id })
	await saveToken(user._id, tokens.refreshToken)

	const { password: pass, ...userDataFromDb } = user._doc
	return {
		...tokens,
		userData: userDataFromDb,
	}
}

const getAllUsers = async () => {
	const users = await User.find()
	return users
}

module.exports = {
	registerUser,
	loginUser,
	logoutService,
	refreshService,
	getAllUsers,
}
