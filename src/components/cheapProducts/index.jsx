import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Radio, Select } from "antd";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCard from "../productCard";
import axios from "axios";

const CheapProducts = () => {
	const { width } = useWindowSize();
	const [itemCount, setitemCount] = useState(4);
	const [data, setdata] = useState(["", "", "", "", ""]);

	const { Option } = Select;

	useEffect(() => {
		if (width > 992) {
			setitemCount(4);
		} else if (width > 768 && width < 992) {
			setitemCount(3);
		} else if (width > 576 && width < 768) {
			setitemCount(2);
		} else {
			setitemCount(1);
		}

		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
			.then(response => {
				if (response.data && response.data.data) {
					setdata(response.data.data);
				} else {
					console.error("Invalid API response:", response);
					setdata([]);
				}
			})
			.catch(error => {
				console.error("Error fetching products:", error);
				setdata([]);
			});
	}, [width]);

	const onChange = value => {
		console.log(`selected ${value}`);
	};

	const onSearch = value => {
		console.log("search:", value);
	};

	return (
		<div className="container">
			<div className="main-contex">
				<p className="component-title">Best Price Drop</p>
				<div className="filters mb-3">
					<div className="d-flex justify-content-between align-items-center">
						<Radio.Group defaultValue="a" buttonStyle="solid">
							<Radio.Button className="filter-radio-item" value="a">
								Latest
							</Radio.Button>
							<Radio.Button className="filter-radio-item mx-3" value="b">
								Best Daily
							</Radio.Button>
							<Radio.Button className="filter-radio-item" value="c">
								Best Weekly
							</Radio.Button>
						</Radio.Group>
						<Select
							style={{ borderRadius: "25.5px" }}
							allowClear
							className="filter-select"
							showSearch
							placeholder="All Categories"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={(input, option) => (option?.children).toLowerCase().includes(input.toLowerCase())}
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</div>
				</div>
				<Swiper
					slidesPerView={itemCount}
					spaceBetween={0}
					loop={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper news-slider-wrapper"
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					navigation={true}
					modules={[Autoplay, Navigation]}
				>
					{data.map((item, index) => (
						<SwiperSlide key={item.id || index} style={{ zIndex: "100" }}>
							{item.image && item.slug ? (
								<Link to={`/product/${item.slug}`}>
									<ProductCard
										image={item.image}
										name={item.title || "Not specified name"}
										price={`${item.price || "Price not specified"} sum`}
										buttonText="View details"
									/>
								</Link>
							) : (
								<div className="product-card-placeholder">
									<p>Data not available</p>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
export default CheapProducts;
