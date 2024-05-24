import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { accessFromSchema } from '../../libs/zod/editCourseSchemas'
import { TChapter } from '../../types/TChapter'
import CardBackground from '../EditCourse/CardBackground'

type Props = {
	initialData: TChapter | null
	setData: (data: TChapter) => void
}

type TAccessSchema = z.infer<typeof accessFromSchema>

const AccessForm = ({ initialData, setData }: Props) => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isFree, setIsFree] = useState<boolean>(initialData?.isFree || false)

	console.log(isFree)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TAccessSchema>({
		resolver: zodResolver(accessFromSchema),
	})

	const handleEditClick = () => {
		setIsEditing(prev => !prev)
	}

	const handleChange = () => {
		setIsFree(prev => !prev)
	}

	const onSubmit: SubmitHandler<TAccessSchema> = async data => {
		setData({
			...initialData!,
			isFree: data.isFree,
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
					Доступ к главе
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
				initialData?.isFree ? (
					<Typography component='p' sx={{ mt: 2 }}>
						Данная глава является{' '}
						<Typography component='span' sx={{ fontWeight: 'bold' }}>
							бесплатной
						</Typography>
					</Typography>
				) : (
					<Typography component='p' sx={{ mt: 2 }}>
						Данная глава является{' '}
						<Typography component='span' sx={{ fontWeight: 'bold' }}>
							платной
						</Typography>
					</Typography>
				)
			) : (
				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<Box component='div' sx={{ mt: 2 }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={isFree}
									onChange={handleChange}
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 28 },
									}}
								/>
							}
							label='Установите этот флажок, если вы хотите сделать эту главу бесплатной для предварительного просмотра'
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: 12,
									color: 'text.secondary',
								},
							}}
							{...register('isFree')}
						/>

						{errors.isFree && (
							<Typography variant='body2' color='error' component='p'>
								{errors.isFree.message}
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
				</Box>
			)}
		</CardBackground>
	)
}
export default AccessForm
