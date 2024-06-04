import { zodResolver } from '@hookform/resolvers/zod'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import SyncIcon from '@mui/icons-material/Sync'
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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { titleFormSchema } from '../../../libs/zod/editCourseSchemas'
import { createChapter, reorderChapter } from '../../../services/ChapterService'
import { CourseResponse } from '../../../types/response/CourseResponse'
import CardBackground from '../CardBackground'
import ChaptersList from './ChaptersList'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

type TChaptersSchema = z.infer<typeof titleFormSchema>

const ChaptersForm = ({ initialData, setData }: Props) => {
	const [isCreating, setIsCreating] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)

	const navigate = useNavigate()

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
		try {
			const response = await createChapter(data.title, initialData?._id!)
			const newChapter = response.data
			if (initialData?.chapters) {
				setData({
					...initialData,
					chapters: [...initialData.chapters, newChapter],
				})
			} else {
				setData({
					...initialData!,
					chapters: [newChapter],
				})
			}
		} catch (err) {
			console.log(err)
		}
		setIsCreating(false)
	}

	const onReorder = async (updateData: { id: string; position: number }[]) => {
		try {
			setIsUpdating(true)
			await reorderChapter(updateData)
			toast.success('Порядок глав успешно изменен')
		} catch (err) {
			console.log(err)
			toast.error('Возникла ошибка')
		} finally {
			setIsUpdating(false)
		}
	}

	const onEdit = (chapterId: string) => {
		navigate(`/teachers/edit/${initialData?._id}/chapters/${chapterId}`)
	}

	return (
		<CardBackground>
			{isUpdating && (
				<Box
					component='div'
					sx={{
						left: 0,
						top: 0,
						position: 'absolute',
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.1)',
						borderRadius: 2,
					}}
				>
					<SyncIcon
						sx={{
							animation: 'spin 2s linear infinite',
							'@keyframes spin': {
								'0%': {
									transform: 'rotate(0deg)',
								},
								'100%': {
									transform: 'rotate(360deg)',
								},
							},
						}}
					/>
				</Box>
			)}
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}
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
							<ChaptersList
								onEdit={onEdit}
								onReorder={onReorder}
								items={initialData?.chapters || []}
							/>
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

ChaptersForm.Skeleton = () => {
	return (
		<CardBackground>
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}
			>
				<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
					Главы курса
				</Typography>
				<Stack direction='row' spacing={1} alignItems={'center'}>
					<AddCircleIcon fontSize='small' />
					<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
						Добавить
					</Typography>
				</Stack>
			</Stack>

			<Stack direction='column' spacing={1}>
				<Skeleton variant='rounded' width={'100%'} height={40} />
				<Skeleton variant='rounded' width={'100%'} height={40} />
				<Skeleton variant='rounded' width={'100%'} height={40} />
			</Stack>
		</CardBackground>
	)
}

export default ChaptersForm
