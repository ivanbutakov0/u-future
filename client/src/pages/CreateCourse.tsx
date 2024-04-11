import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import createCourseSchema from '../libs/zod/createCourseSchema'

type TCreateCourseSchema = z.infer<typeof createCourseSchema>

const CreateCourse = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<TCreateCourseSchema>({
		resolver: zodResolver(createCourseSchema),
	})

	const navigate = useNavigate()
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log('submit')
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

			<Box component='form' onSubmit={handleFormSubmit}>
				<TextField
					size='small'
					label='Название курса'
					sx={{ minWidth: { sm: '300px' }, mb: 2 }}
					{...register('name')}
				/>
				{errors.name && (
					<Typography variant='body2' color='error' component='span'>
						{errors.name.message}
					</Typography>
				)}
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
						disabled={!isValid}
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
