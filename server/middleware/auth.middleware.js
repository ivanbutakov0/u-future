const { validateAccessToken } = require('../services/token.servise')
const { errorHandler } = require('../utils/error')

const authMiddleware = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			return next(errorHandler(401, 'Пользователь не авторизован'))
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(errorHandler(401, 'Пользователь не авторизован'))
		}

		const userData = await validateAccessToken(accessToken)
		if (!userData) {
			return next(errorHandler(401, 'Пользователь не авторизован'))
		}

		req.user = userData
		next()
	} catch (err) {
		return next(errorHandler(401, 'Пользователь не авторизован'))
	}
}

module.exports = {
	authMiddleware,
}
