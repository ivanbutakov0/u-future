const {
	registerUser,
	loginUser,
	logoutService,
	refreshService,
	getAllUsers,
	loginGoogleUser,
	updateUserService,
	addCourseToCartService,
	removeCourseFromCartService,
	getUserByIdService,
} = require('../services/user.servise')
const { validationResult } = require('express-validator')
const { errorHandler } = require('../utils/error')
const { OAuth2Client } = require('google-auth-library')

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

const googleAuth = async (req, res, next) => {
	const googleClient = new OAuth2Client(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		'postmessage'
	)

	try {
		const { tokens } = await googleClient.getToken(req.body.code) // exchange code for tokens

		const ticket = await googleClient.verifyIdToken({
			idToken: tokens.id_token,
			audience: process.env.GOOGLE_CLIENT_ID,
		})

		const payload = ticket.getPayload()

		const userData = await loginGoogleUser(
			(email = payload.email),
			(username = payload.name),
			(avatar = payload.picture)
		)

		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.json(userData)
	} catch (err) {
		console.log(err)
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

const updateUser = async (req, res, next) => {
	try {
		const { id, data } = req.body
		const userData = await updateUserService(id, data)
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const addCourseToCart = async (req, res, next) => {
	try {
		const { id, courseId } = req.body

		const user = await getUserByIdService(id)

		const existingCourse = user.cart.find(
			course => course._id.toString() === courseId
		)

		if (existingCourse) {
			return next(errorHandler(400, 'Курс уже добавлен в корзину'))
		}

		const userData = await addCourseToCartService(id, courseId)
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const removeCourseFromCart = async (req, res, next) => {
	try {
		const { id, courseId } = req.body
		const userData = await removeCourseFromCartService(id, courseId)
		res.json(userData)
	} catch (err) {
		next(err)
	}
}

const payForCart = async (req, res, next) => {
	try {
		const { userId, totalPrice } = req.body

		const user = await getUserByIdService(userId)

		if (user.money < totalPrice) {
			return next(errorHandler(400, 'Недостаточно средств'))
		}

		//const userData = await payForCartService(user)

		const userData = await updateUserService(userId, {
			money: user.money - totalPrice,
			boughtCourses: [...user.boughtCourses, ...user.cart],
			cart: [],
		})
		res.json(userData)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	registration,
	googleAuth,
	login,
	logout,
	refresh,
	getUsers,
	updateUser,
	addCourseToCart,
	removeCourseFromCart,
	payForCart,
}
