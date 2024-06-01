import TuneIcon from '@mui/icons-material/Tune'
import { Box, Chip, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import CategoryFilter from './CategoryFilter/CategoryFilter'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #ccc',
	boxShadow: 24,
	p: 4,
}

const FilterModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

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
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Фильтр по категории
					</Typography>
					<CategoryFilter />
				</Box>
			</Modal>
		</div>
	)
}
export default FilterModal
