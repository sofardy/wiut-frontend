import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CollapseProduct from "./collapseProduct";
import StatisticsProduct from "./statistics";
import { Radio } from "antd";
import AboutProduct from "./aboutPtroduct";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductView = () => {
	const { slug } = useParams(); // Получение slug из URL
	const [statistic, setStatistic] = useState(1);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		if (!slug) {
			console.error("Slug is undefined");
			return;
		}

		axios
			.get(`${API_BASE_URL}/products/${slug}`)
			.then(response => {
				setProduct(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching product:", error);
			});
	}, [slug]); // Добавление slug в зависимости useEffect

	if (!slug) {
		return <div>Error: slug not provided in URL.</div>;
	}

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<div className="main-contex">
				<div className="product-view">
					<div className="row">
						<div className="col-md-4">
							<img src={product.image} className="w-100" alt={product.title} />
						</div>
						<div className="col-md-5">
							<div className="d-flex align-items-start flex-column hight-300">
								<div className="mb-auto bd-highlight">
									<h4 className="mt-3">{product.title}</h4>
								</div>
								<div className="bd-highlight d-md-none">
									<p className="mb-0 description">{product.description}</p>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className="d-flex align-items-end flex-column hight-300">
								<div className="mb-auto bd-highlight text-end w-100-mobile">
									<AiOutlineHeart className="mt-md-5 mb-2" style={{ fontSize: "22px" }} />
									<h5 className="mb-0">{product.price} сум</h5>
									<span className="small-text d-block mb-2">{product.offers[0]?.shop}</span>
									<span className="small-text">{new Date(product.offers[0]?.updated_at_price).toLocaleString()}</span>
								</div>
								<div className="bd-highlight w-100-mobile">
									<a
										href={product.offers[0]?.shop_product_url}
										target="_blank"
										rel="noopener noreferrer"
										className="py-2 px-4 mt-3 main-btn"
									>
										View on {product.offers[0]?.shop}
									</a>
								</div>
							</div>
							<p className="mb-0 mt-5 d-md-inline-block description">
								Subscribe to price drop notifications and start tracking this product by filling out the form below.
							</p>
						</div>
					</div>
					<CollapseProduct offers={product.offers} />
					<div className="filters mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<Radio.Group defaultValue={1} onChange={e => setStatistic(e.target.value)} buttonStyle="solid">
								<Radio.Button className="filter-radio-item me-3" value={1}>
									Отслеживание цен
								</Radio.Button>
								<Radio.Button className="filter-radio-item" value={2}>
									Детали товара
								</Radio.Button>
							</Radio.Group>
						</div>
					</div>
					{statistic === 1 ? <StatisticsProduct /> : <AboutProduct attributes={product.attributes} />}
				</div>
			</div>
		</div>
	);
};

export default ProductView;
