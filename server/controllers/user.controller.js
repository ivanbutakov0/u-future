const {
	registerUser,
	loginUser,
	logoutService,
	refreshService,
	getAllUsers,
} = require('../services/user.servise')
const { validationResult } = require('express-validator')
const { errorHandler } = require('../utils/error')

const registration = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(errorHandler(400, errors.array()[0].msg))
		}

		const { username, email, password } = req.body
		const userData = await registerUser(username, email, password)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const userData = await loginUser(email, password)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies
		const token = await logoutService(refreshToken)
		res.clearCookie('refreshToken')
		return res.json(token)
	} catch (err) {
		next(err)
	}
}

const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies
		const userData = await refreshService(refreshToken)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const getUsers = async (req, res, next) => {
	try {
		const users = await getAllUsers()
		res.json(users)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	registration,
	login,
	logout,
	refresh,
	getUsers,
}