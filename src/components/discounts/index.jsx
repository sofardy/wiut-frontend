import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import axios from "axios";
import "swiper/css/pagination";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Discounts = () => {
	const { width } = useWindowSize();
	const [itemCount, setItemCount] = useState(4);
	const [data, setData] = useState([]);

	// Fetch promotions
	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/promotions`)
			.then(response => {
				setData(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching promotions:", error);
			});
	}, []);

	useEffect(() => {
		if (width > 992) {
			setItemCount(4);
		} else if (width > 768 && width < 992) {
			setItemCount(3);
		} else if (width > 576 && width < 768) {
			setItemCount(2);
		} else {
			setItemCount(1);
		}
	}, [width]);

	return (
		<div className="container">
			<div className="main-contex">
				<p className="component-title">Лучшие акции</p>
				<Swiper
					slidesPerView={itemCount}
					spaceBetween={20}
					loop={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper news-slider-wrapper"
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					modules={[Pagination]}
				>
					{data.map(item => (
						<SwiperSlide key={item.id} style={{ zIndex: "100" }}>
							<div className="skidka">
								<img className="w-100" src={item.image} alt={item.title} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Discounts;
