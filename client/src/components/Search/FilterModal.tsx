import TuneIcon from '@mui/icons-material/Tune'
import {
	Box,
	Button,
	Chip,
	Divider,
	Modal,
	Stack,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { TCategory } from '../../types/TCategory'
import CategoryFilter from './CategoryFilter/CategoryFilter'
import PriceFilter from './PriceFilter'
import TopicFilter from './TopicFilter'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: {
		xs: '90%',
		sm: '400px',
		md: '80%',
	},
	height: '60%',
	bgcolor: 'background.paper',
	border: '1px solid #ccc',
	boxShadow: 24,
	p: 4,
	overflow: 'auto',
}

type Props = {
	selectedCategory: TCategory
	setSelectedCategory: any
	selectedTopics: string[]
	setSelectedTopics: any
	priceFilterValue: number[]
	setPriceFilterValue: any
}

const FilterModal = ({
	selectedCategory,
	setSelectedCategory,
	selectedTopics,
	setSelectedTopics,
	priceFilterValue,
	setPriceFilterValue,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => setIsOpen(true)

	const handleClose = () => setIsOpen(false)

	const handleClearClick = () => {
		setSelectedCategory({} as TCategory)
		setSelectedTopics([])
		setIsOpen(false)
	}

	return (
		<div>
			<Chip
				label='Filters'
				variant='filled'
				color='primary'
				onClick={handleOpen}
				icon={<TuneIcon sx={{ width: '18px', height: '18px' }} />}
				sx={{
					padding: 1,
				}}
			/>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Box component={'div'} sx={{ textAlign: 'right' }}>
						<Button
							type='button'
							variant='contained'
							size='small'
							onClick={handleClearClick}
							sx={{
								mb: 2,
							}}
						>
							Очистить фильтры
						</Button>
					</Box>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
						sx={{ ml: 10 }}
					>
						Фильтр по цене
					</Typography>
					<PriceFilter
						priceFilterValue={priceFilterValue}
						setPriceFilterValue={setPriceFilterValue}
					/>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						alignItems='start'
						justifyContent={'space-between'}
						gap={3}
						sx={{ minHeight: '80%' }}
					>
						<Box component={'div'} sx={{ flex: 1 }}>
							<Typography
								id='modal-modal-title'
								variant='h6'
								component='h2'
								sx={{ textAlign: 'center' }}
							>
								Фильтр по категории
							</Typography>
							<CategoryFilter
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
							/>
						</Box>
						<Divider orientation='vertical' flexItem />
						<Box component={'div'} sx={{ flex: 1 }}>
							<Typography
								id='modal-modal-title'
								variant='h6'
								component='h2'
								sx={{ textAlign: 'center' }}
							>
								Фильтр по тематике
							</Typography>
							<TopicFilter
								selectedTopics={selectedTopics}
								setSelectedTopics={setSelectedTopics}
								allowedTopics={selectedCategory.allowedTopics}
							/>
						</Box>
					</Stack>
				</Box>
			</Modal>
		</div>
	)
}
export default FilterModal
