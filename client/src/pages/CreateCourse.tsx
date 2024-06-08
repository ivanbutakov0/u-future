import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import createCourseSchema from '../libs/zod/createCourseSchema'
import { RootState } from '../redux/store'
import { createCourse } from '../services/CourseService'

type TCreateCourseSchema = z.infer<typeof createCourseSchema>

const CreateCourse = () => {
	const userId = useSelector((state: RootState) => state.user.currentUser?._id)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<TCreateCourseSchema>({
		resolver: zodResolver(createCourseSchema),
	})

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<TCreateCourseSchema> = async data => {
		if (!userId) {
			navigate('/login')
			toast.error('Для создания курса необходимо авторизоваться')
		}

		try {
			const response = await createCourse(data.name, userId!)
			toast.success(`Курс "${response.data.title}" успешно создан`)
			navigate(`/teachers/edit/${response.data._id}`)
		} catch (err: any) {
			toast.error('Произошла ошибка при создании курса')
			console.log(err)
		}
	}

	const handleGoBack = () => {
		navigate(-1)
	}

	return (
		<Stack direction='column' spacing={4} sx={{ pt: 4 }}>
			<Box>
				<Typography variant='h4'>
					Придумайте название для вашего курса
				</Typography>
				<Typography component='p'>
					Как вы назовете курс? Не волнуйтесь, вы сможете переименовать его
					позже
				</Typography>
			</Box>

			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<TextField
					size='small'
					label='Название курса'
					sx={{ minWidth: { sm: '300px' }, mb: 0.5 }}
					{...register('name')}
				/>
				<Box sx={{ mb: 2 }}>
					{errors.name && (
						<Typography variant='body2' color='error' component='span'>
							{errors.name.message}
						</Typography>
					)}
				</Box>

				<Stack direction='row' spacing={2}>
					<Button
						variant='outlined'
						size='small'
						color='primary'
						onClick={handleGoBack}
					>
						Отмена
					</Button>
					<Button
						type='submit'
						size='small'
						disabled={!isValid || isSubmitting}
						variant='contained'
					>
						Продолжить
					</Button>
				</Stack>
			</Box>
		</Stack>
	)
}
export default CreateCourse
