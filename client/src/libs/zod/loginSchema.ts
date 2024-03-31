import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email({ message: 'Некорректный email' }),
	password: z.string().min(1, { message: 'Введите пароль' }),
})

export default loginSchema
