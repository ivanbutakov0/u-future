import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { descFormSchema } from '../../libs/zod/editCourseSchemas'
import { TChapter } from '../../types/TChapter'
import CardBackground from '../EditCourse/CardBackground'

type Props = {
	initialData: TChapter | null
	setData: (data: TChapter) => void
}

type TLoginSchema = z.infer<typeof descFormSchema>

const DescForm = ({ initialData, setData }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: zodResolver(descFormSchema),
	})

	const handleEditClick = () => {
		setIsEditing(prev => !prev)
	}

	const onSubmit: SubmitHandler<TLoginSchema> = async data => {
		setData({
			...initialData!,
			description: data.description,
		})
		toast('Описание главы успешно изменено')
		setIsEditing(false)
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
					Описание главы
				</Typography>
				{!isEditing ? (
					<Stack
						direction='row'
						spacing={1}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={handleEditClick}
					>
						<EditIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Изменить
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
			{!isEditing ? (
				<Typography component='p' sx={{ mt: 2 }}>
					{initialData?.description || 'Нет описания'}
				</Typography>
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
								id='description'
								label='Описание главы'
								autoFocus
								size='small'
								defaultValue={initialData?.description}
								{...register('description')}
							/>
							{errors.description && (
								<Typography variant='body2' color='error' component='p'>
									{errors.description.message}
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
export default DescForm
