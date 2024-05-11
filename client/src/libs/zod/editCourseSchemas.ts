import { z } from 'zod'

export const titleFormSchema = z.object({
	title: z.string().min(1, { message: 'Введите название' }),
})

export const descFormSchema = z.object({
	description: z.string().min(1, { message: 'Введите описание' }),
})

export const topicFormSchema = z.object({
	topics: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну тему' }),
})
