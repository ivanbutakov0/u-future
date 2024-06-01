import { Stack, TextField } from '@mui/material'
import FilterModal from './FilterModal'

const SearchHeader = () => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value

		console.log(value)
	}
	return (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent={'center'}
			gap={2}
			sx={{
				p: 2,
			}}
		>
			<TextField
				margin='normal'
				id='title'
				label='Поиск курса'
				size='small'
				onChange={handleInputChange}
				sx={{ m: 0 }}
			/>
			<FilterModal />
		</Stack>
	)
}
export default SearchHeader
