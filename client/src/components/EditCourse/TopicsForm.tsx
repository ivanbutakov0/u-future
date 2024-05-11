import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Stack, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { topicFormSchema } from '../../libs/zod/editCourseSchemas'
import { CourseResponse } from '../../types/response/CourseResponse'
import { TTopic } from '../../types/TTopic'
import CardBackground from './CardBackground'

type Props = {
	topics?: TTopic[]
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

type TTopicSchema = z.infer<typeof topicFormSchema>

const TopicsForm = ({ topics, initialData, setData }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [checked, setChecked] = useState<string[]>(
		initialData?.topics?.map(topic => topic.name) || []
	)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TTopicSchema>({
		resolver: zodResolver(topicFormSchema),
	})

	const handleEditClick = () => {
		setIsEditing(prev => !prev)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(prev => {
			if (prev.includes(event.target.value)) {
				return prev.filter(item => item !== event.target.value)
			}
			return [...prev, event.target.value]
		})
	}

	const onSubmit: SubmitHandler<TTopicSchema> = async data => {
		const newCourseTopics = [] as TTopic[]

		// Find topics in allowed topics
		data.topics.forEach(topic => {
			const foundTopic = initialData?.category?.allowedTopics?.find(
				t => t.name === topic
			)

			if (!foundTopic) {
				console.log('Topic not found')
				return
			}
			newCourseTopics.push(foundTopic)
		})

		setData({
			...initialData!,
			topics: newCourseTopics,
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
					Тематика курса
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

			<Typography variant='body1' component='p' sx={{ marginTop: 2 }}>
				Текущая тематика:{' '}
				{initialData?.topics?.length ?? 0 > 0
					? initialData?.topics?.map((topic, index) => (
							<Typography
								component='span'
								key={topic.name}
								sx={{
									fontStyle: 'italic',
									fontWeight: 'bold',
									textTransform: 'capitalize',
								}}
							>
								{topic.name}
								{index === (initialData?.topics?.length ?? 0) - 1 ? '. ' : ', '}
							</Typography>
					  ))
					: '...'}
			</Typography>

			{isEditing && (
				<Box component='form' onSubmit={handleSubmit(onSubmit)}>
					<Stack
						direction='row'
						spacing={1}
						alignItems={'end'}
						justifyContent={'space-between'}
					>
						<FormGroup aria-label='position'>
							{topics?.map(topic => (
								<FormControlLabel
									key={topic.name}
									value={topic.name}
									control={
										<Checkbox
											checked={checked.includes(topic.name)}
											onChange={handleChange}
										/>
									}
									label={topic.name}
									labelPlacement='end'
									{...register('topics', { required: true })}
								/>
							))}
							{errors.topics && (
								<Typography variant='body2' color='error' component='p'>
									{errors.topics.message}
								</Typography>
							)}
						</FormGroup>

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
export default TopicsForm
