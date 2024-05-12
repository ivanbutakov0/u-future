import { zodResolver } from '@hookform/resolvers/zod'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { titleFormSchema } from '../../libs/zod/editCourseSchemas'
import { CourseResponse } from '../../types/response/CourseResponse'
import CardBackground from './CardBackground'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

type TChaptersSchema = z.infer<typeof titleFormSchema>

const ChaptersForm = ({ initialData, setData }: Props) => {
	const [isCreating, setIsCreating] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TChaptersSchema>({
		resolver: zodResolver(titleFormSchema),
	})

	const handleEditClick = () => {
		setIsCreating(prev => !prev)
	}

	const onSubmit: SubmitHandler<TChaptersSchema> = async data => {
		console.log('new chapter: ', data.title)
	}

	return (
		<CardBackground>
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
					Главы курса
				</Typography>
				{!isCreating ? (
					<Stack
						direction='row'
						spacing={1}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={handleEditClick}
					>
						<AddCircleIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Добавить
						</Typography>
					</Stack>
				) : (
					<Stack
						direction='row'
						spacing={1}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={handleEditClick}
					>
						<CloseIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Отмена
						</Typography>
					</Stack>
				)}
			</Stack>
			{!isCreating ? (
				<>
					<Box component='div'>
						{!initialData?.chapters?.length ? (
							<Typography variant='body2' component='p' sx={{ mt: 2 }}>
								Нет глав
							</Typography>
						) : (
							// TODO: Add chapters list
							<p>chapters list</p>
						)}
					</Box>
					<Typography
						variant='caption'
						component='p'
						color='text.secondary'
						sx={{ mt: 2, fontStyle: 'italic' }}
					>
						Перетащите главы, чтобы изменить их порядок
					</Typography>
				</>
			) : (
				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack
						direction='row'
						alignItems='start'
						justifyContent='space-between'
					>
						<Box component='div'>
							<TextField
								margin='normal'
								required
								id='chapter'
								label='Название главы'
								autoFocus
								size='small'
								{...register('title')}
							/>
							{errors.title && (
								<Typography variant='body2' color='error' component='p'>
									{errors.title.message}
								</Typography>
							)}
						</Box>

						<Button
							type='submit'
							disabled={isSubmitting}
							variant='contained'
							size='small'
							sx={{
								textTransform: 'none',
								mt: 2,
							}}
						>
							Сохранить
						</Button>
					</Stack>
				</Box>
			)}
		</CardBackground>
	)
}
export default ChaptersForm
