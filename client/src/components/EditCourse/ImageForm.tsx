import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import ImageIcon from '@mui/icons-material/Image'
import {
	Box,
	CircularProgress,
	Paper,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { app } from '../../libs/firebase'
import { CourseResponse } from '../../types/response/CourseResponse'

type Props = {
	initialData: CourseResponse | null
	setData: (data: CourseResponse) => void
}

const ImageForm = ({ initialData, setData }: Props) => {
	const theme = useTheme()
	const [file, setFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		if (file) {
			handleFileUpload(file)
		}
	}, [file])

	// Set up dropzone
	const onDrop = (acceptedFiles: File[]) => {
		handleFileUpload(acceptedFiles[0])
	}
	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024,
		accept: { 'image/*': [] },
	})

	const handleEditClick = () => {
		inputRef.current?.click()
	}

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFile(file)
		} else {
			toast.error('Файл не выбран', {
				autoClose: 1500,
			})
			console.log('No file')
		}
	}

	const handleFileUpload = async (file: File) => {
		const storage = getStorage(app)
		const fileName = new Date().getTime() + file.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			snapshot => {
				setIsUploading(true)

				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused')
						break
					case 'running':
						console.log('Upload is running')
						break
				}
			},
			error => {
				toast.error('Произошла ошибка')
				console.log('error', error)
				setIsUploading(false)
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
				setData({ ...initialData!, imageUrl: downloadURL })
				setFile(null)
				setIsUploading(false)
			}
		)
	}

	return (
		<Paper
			elevation={3}
			sx={{ backgroundColor: theme.palette.secondary.light, p: 3 }}
		>
			<Stack
				direction='row'
				spacing={1}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }}>
					Превью курса
				</Typography>
				{initialData?.imageUrl ? (
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
						<AddCircleIcon fontSize='small' />
						<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
							Добавить
						</Typography>
					</Stack>
				)}
			</Stack>

			<Box
				{...getRootProps()}
				component='div'
				sx={{
					mt: 2,
					backgroundColor: '#e3e3e3',
					transition: 'all 0.3s ease',
					'&:hover': {
						backgroundColor: 'lightgray',
						scale: 2,
					},
					...(isDragActive && { backgroundColor: 'gray' }),
					borderRadius: 2,
					height: 200,
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
				}}
				onClick={handleEditClick}
			>
				<input
					{...getInputProps()}
					accept='image/*'
					onChange={handleImageUpload}
				/>

				{initialData?.imageUrl && !isUploading ? (
					<img
						src={initialData?.imageUrl}
						alt='preview'
						style={{
							width: '100%',
							height: 200,
							objectFit: 'cover',
							borderRadius: 8,
							cursor: 'pointer',
							transition: 'all 0.3s ease',
						}}
						onMouseEnter={e => {
							e.currentTarget.style.transform = 'scale(1.05)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.transform = 'scale(1)'
						}}
					/>
				) : (
					<>
						<ImageIcon fontSize='large' sx={{ color: '#040316' }} />
						<Typography
							variant='body2'
							component='p'
							sx={{ fontWeight: 'bold', color: '#040316' }}
						>
							Перетащите файлы сюда...
						</Typography>
					</>
				)}

				{isUploading && <CircularProgress />}
			</Box>
		</Paper>
	)
}
export default ImageForm
