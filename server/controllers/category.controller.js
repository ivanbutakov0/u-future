const { createCategoryService } = require('../services/category.servise')

const createCategory = async (req, res) => {
	try {
		const { name } = req.body
		const category = await createCategoryService(name)

		res.json(category)
	} catch (err) {
		next(err)
	}
}

module.exports = { createCategory }
