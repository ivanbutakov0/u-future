const express = require('express')
const {
	getUsers,
	refresh,
	registration,
	logout,
	login,
	googleAuth,
} = require('../controllers/user.controller')
const { body } = require('express-validator')
const { authMiddleware } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authMiddleware, getUsers)
router.get('/refresh', refresh)
router.post(
	'/registration',
	body('username', 'Имя должно быть больше 3 и меньше 20').isLength({
		min: 3,
		max: 20,
	}),
	body('email', 'Некорректный email').isEmail(),
	body('password', 'Пароль должен быть больше 3 и меньше 32').isLength({
		min: 3,
		max: 32,
	}),
	registration
)
router.post('/google-auth', googleAuth)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
