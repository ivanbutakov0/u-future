import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	Stack,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { priceFormSchema } from '../../libs/zod/editCourseSchemas'
import { CourseResponse } from '../../types/response/CourseResponse'
import CardBackground from './CardBackground'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

type TPriceSchema = z.infer<typeof priceFormSchema>

const PriceForm = ({ initialData, setData }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TPriceSchema>({
		resolver: zodResolver(priceFormSchema),
	})

	const handleEditClick = () => {
		setIsEditing(prev => !prev)
	}

	const onSubmit: SubmitHandler<TPriceSchema> = async data => {
		setData({
			...initialData!,
			price: data.price,
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
					Цена курса
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
					{initialData?.price + '₽' || '...'}
				</Typography>
			) : (
				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack
						direction='row'
						alignItems='start'
						justifyContent='space-between'
					>
						<Box component='div'>
							<FormControl sx={{ m: 1 }} variant='standard'>
								<InputLabel htmlFor='price'>Цена</InputLabel>
								<Input
									type='number'
									id='price'
									margin='none'
									defaultValue={initialData?.price}
									{...register('price')}
									autoFocus
									required
									startAdornment={
										<InputAdornment position='start'>₽</InputAdornment>
									}
								/>
							</FormControl>

							{errors.price && (
								<Typography variant='body2' color='error' component='p'>
									{errors.price.message}
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
export default PriceForm
