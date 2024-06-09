import { Box } from '@mui/material'
import CourseGroup from '../components/Home/CourseGroup'
import HomeSwiper from '../components/Home/HomeSwiper'

const HomePage = () => {
	return (
		<Box component='section' sx={{ pb: 4 }}>
			<HomeSwiper />
			<CourseGroup title='Курсы по разработке' category='разработка' />
		</Box>
	)
}
export default HomePage
