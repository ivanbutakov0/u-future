import { Box } from '@mui/material'

type TabPanelProps = {
	children?: React.ReactNode
	index: number
	currentTabIndex: number
}

const CustomTabPanel = (props: TabPanelProps) => {
	const { children, currentTabIndex, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={currentTabIndex !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{currentTabIndex === index && <Box component='div'>{children}</Box>}
		</div>
	)
}
export default CustomTabPanel
