import { z } from 'zod'

const registrationSchema = z.object({
	username: z.string().min(1, { message: 'Введите имя' }),
	email: z.string().email({ message: 'Некорректный email' }),
	password: z.string().min(1, { message: 'Введите пароль' }),
})

export default registrationSchema
