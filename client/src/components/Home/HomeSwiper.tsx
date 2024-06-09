// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import {
	Autoplay,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
} from 'swiper/modules'

const HomeSwiper = () => {
	return (
		<>
			<Swiper
				cssMode={true}
				navigation={true}
				pagination={true}
				mousewheel={true}
				keyboard={true}
				autoplay={true}
				modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
				style={{
					maxHeight: '450px',
				}}
			>
				<SwiperSlide
					style={{
						height: '100%',
					}}
				>
					<img
						src='/students-at-work.jpg'
						alt='students at work'
						width='100%'
						height='100%'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</SwiperSlide>
				<SwiperSlide
					style={{
						height: '100%',
					}}
				>
					<img
						src='/studying.jpg'
						alt='studying'
						width='100%'
						height='100%'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</SwiperSlide>
				<SwiperSlide
					style={{
						height: '100%',
					}}
				>
					<img
						src='/library.jpg'
						alt='library'
						width='100%'
						height='100%'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</SwiperSlide>
			</Swiper>
		</>
	)
}

export default HomeSwiper
