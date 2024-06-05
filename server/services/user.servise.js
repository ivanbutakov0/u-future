const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {
	generateTokens,
	saveToken,
	removeToken,
	validateRefreshToken,
	findToken,
} = require('./token.servise')
const { errorHandler } = require('../utils/error')
const generateRandomHexColor = require('../utils/generateRandomHexColor')

const registerUser = async (username, email, password, avatar = '') => {
	const candidate = await User.findOne({ email })
	if (candidate) {
		return errorHandler(409, 'Пользователь с таким email уже существует')
	}

	const backgroundColor = generateRandomHexColor()
	const hashedPassword = await bcrypt.hash(password, 5)
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		backgroundAvatar: backgroundColor,
		avatar,
	})
	const tokens = await generateTokens({ id: user._id })
	await saveToken(user._id, tokens.refreshToken)

	const { password: pass, ...userData } = user._doc

	return {
		...tokens,
		userData,
	}
}

const loginGoogleUser = async (email, username, avatar) => {
	const user = await User.findOne({ email })

	let response

	if (user) {
		const tokens = await generateTokens({ id: user._id })
		await saveToken(user._id, tokens.refreshToken)

		const { password: pass, ...userData } = user._doc

		response = {
			...tokens,
			userData,
		}
	} else {
		const generatedPassword =
			Math.random().toString(36).slice(-8) +
			Math.random().toString(36).slice(-8)
		const newName = username.slice(0, 20)

		response = await registerUser(newName, email, generatedPassword, avatar)
	}

	if (!response) {
		return errorHandler(401, 'Ошибка при регистрации или авторизации')
	}

	return {
		...response,
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
		throw errorHandler(401, 'Нужно авторизоваться, отсутствует refreshToken')
	}
	const userData = await validateRefreshToken(refreshToken)
	const tokenFromDb = await findToken(refreshToken)
	if (!userData || !tokenFromDb) {
		throw errorHandler(401, 'Нужно авторизоваться, неверный refreshToken')
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

const updateUserService = async (id, data) => {
	const user = await User.findByIdAndUpdate(id, data, { new: true })
	return user
}

module.exports = {
	registerUser,
	loginGoogleUser,
	loginUser,
	logoutService,
	refreshService,
	getAllUsers,
	updateUserService,
}
