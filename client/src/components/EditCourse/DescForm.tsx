import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { descFormSchema } from '../../libs/zod/editCourseSchemas'
import { CourseResponse } from '../../types/response/CourseResponse'
import CardBackground from './CardBackground'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
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
					Описание курса
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
								label='Описание курса'
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

DescForm.Skeleton = () => {
	return (
		<CardBackground>
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
					Описание курса
				</Typography>
				<Stack direction='row' spacing={1} alignItems={'center'}>
					<EditIcon fontSize='small' />
					<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
						Изменить
					</Typography>
				</Stack>
			</Stack>
			<Typography component='p' sx={{ mt: 2 }}>
				<Skeleton variant='text' width={'100%'} />
				<Skeleton variant='text' width={'70%'} />
				<Skeleton variant='text' width={'80%'} />
			</Typography>
		</CardBackground>
	)
}

export default DescForm
