import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { LinkVideoFormSchema } from '../../../libs/zod/editCourseSchemas'
import { TChapter } from '../../../types/TChapter'
import CardBackground from '../../EditCourse/CardBackground'
import VideoPlayer from '../../VideoPlayer'

type Props = {
	initialData: TChapter | null
	setData: (data: TChapter) => void
}

type TVideoUrlSchema = z.infer<typeof LinkVideoFormSchema>

const LinkVideoForm = ({ initialData, setData }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TVideoUrlSchema>({
		resolver: zodResolver(LinkVideoFormSchema),
	})

	const handleEditClick = () => {
		setIsEditing(prev => !prev)
	}

	const onSubmit: SubmitHandler<TVideoUrlSchema> = async data => {
		setData({
			...initialData!,
			videoUrl: data.videoUrl,
		})
		toast.success('Видео изменено')
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
					Ссылка на видео
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
				<Box
					component='div'
					sx={{
						mt: 2,
						backgroundColor: '#e3e3e3',
						transition: 'all 0.3s ease',
						borderRadius: 2,
						height: 200,
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{initialData?.videoUrl ? (
						<VideoPlayer url={initialData.videoUrl} />
					) : (
						<Stack direction='row' alignItems='center' gap={1}>
							<VideocamOffIcon />
							<Typography>Нет видео</Typography>
						</Stack>
					)}
				</Box>
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
								id='videoUrl'
								label='Ссылка на видео'
								autoFocus
								size='small'
								defaultValue={initialData?.videoUrl}
								{...register('videoUrl')}
							/>
							{errors.videoUrl && (
								<Typography variant='body2' color='error' component='p'>
									{errors.videoUrl.message}
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
export default LinkVideoForm
