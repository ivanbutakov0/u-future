import { z } from 'zod'

const createCourseSchema = z.object({
	name: z.string().min(1, { message: 'Введите название' }),
})

export default createCourseSchema
