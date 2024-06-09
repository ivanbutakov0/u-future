import { Box } from '@mui/material'
import CourseGroup from '../components/Home/CourseGroup'
import HomeSwiper from '../components/Home/HomeSwiper'
import UserCourses from '../components/Home/UserCourses'

const HomePage = () => {
	return (
		<Box component='section' sx={{ pb: 4 }}>
			<HomeSwiper />
			<CourseGroup title='Курсы по разработке' category='разработка' />
			<CourseGroup title='Курсы по бизнесу' category='Бизнес' />
			<UserCourses />
		</Box>
	)
}
export default HomePage
