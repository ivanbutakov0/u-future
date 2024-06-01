import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
} from '@mui/material'
import { TTopic } from '../../types/TTopic'

type Props = {
	allowedTopics: TTopic[]
	selectedTopics: string[]
	setSelectedTopics: any
}

const TopicFilter = ({
	allowedTopics,
	selectedTopics,
	setSelectedTopics,
}: Props) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedTopics((prev: string[]) => {
			if (prev.includes(event.target.value)) {
				return prev.filter((item: string) => item !== event.target.value)
			}
			return [...prev, event.target.value]
		})
	}

	return (
		<Box
			component={'div'}
			sx={{
				maxWidth: '280px',
			}}
		>
			{allowedTopics?.length > 0 ? (
				<FormGroup aria-label='position'>
					{allowedTopics?.map(topic => (
						<FormControlLabel
							key={topic.name}
							value={topic.name}
							control={
								<Checkbox
									checked={selectedTopics.includes(topic.name)}
									onChange={handleChange}
								/>
							}
							label={topic.name}
							labelPlacement='end'
						/>
					))}
				</FormGroup>
			) : (
				<Typography component={'p'}>Сначала выберите категорию</Typography>
			)}
		</Box>
	)
}
export default TopicFilter
