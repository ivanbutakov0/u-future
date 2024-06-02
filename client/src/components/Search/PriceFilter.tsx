import { Box, Slider } from '@mui/material'

function valuetext(value: number) {
	return `${value}₽`
}

const MAX = 10000
const MIN = 0
const marks = [
	{
		value: MIN,
		label: '',
	},
	{
		value: MAX,
		label: '',
	},
]

const minDistance = 500

type Props = {
	priceFilterValue: number[]
	setPriceFilterValue: (value: number[]) => void
}

const PriceFilter = ({ priceFilterValue, setPriceFilterValue }: Props) => {
	const handleChange = (
		event: Event,
		newValue: number | number[],
		activeThumb: number
	) => {
		if (!Array.isArray(newValue)) {
			return
		}

		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], MAX - minDistance)
				setPriceFilterValue([clamped, clamped + minDistance])
			} else {
				const clamped = Math.max(newValue[1], minDistance)
				setPriceFilterValue([clamped - minDistance, clamped])
			}
		} else {
			setPriceFilterValue(newValue as number[])
		}
	}
	return (
		<Box sx={{ width: 300, mt: 4, mb: 2 }}>
			<Slider
				getAriaLabel={() => 'Price range'}
				value={priceFilterValue}
				onChange={handleChange}
				valueLabelDisplay='on'
				getAriaValueText={valuetext}
				disableSwap
				marks={marks}
				min={MIN}
				max={MAX}
				step={100}
			/>
		</Box>
	)
}
export default PriceFilter
