import { Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { TChapter } from '../../../types/TChapter'
import CardBackground from '../../EditCourse/CardBackground'
import CustomTabPanel from './CustomTabPanel'
import LinkVideoForm from './LinkVideoForm'

type VideoUploadProps = {
	initialData: TChapter | null
	setData: (data: TChapter) => void
}

const VideoUpload = ({ initialData, setData }: VideoUploadProps) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)

	const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
		setCurrentTabIndex(newTabIndex)
	}

	return (
		<CardBackground>
			<Tabs value={currentTabIndex} onChange={handleChange} centered>
				<Tab label='Ссылка' />
				<Tab label='Файл' />
			</Tabs>
			<CustomTabPanel currentTabIndex={currentTabIndex} index={0}>
				<LinkVideoForm initialData={initialData} setData={setData} />
			</CustomTabPanel>
			<CustomTabPanel currentTabIndex={currentTabIndex} index={1}>
				<Typography variant='body1' component='p' sx={{ mt: 2 }}>
					Данный функционал находится в разработке, воспользуйтесь
					альтернативным решением.
				</Typography>
			</CustomTabPanel>
		</CardBackground>
	)
}
export default VideoUpload
