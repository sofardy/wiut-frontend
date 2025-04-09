import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { IoLogoUsd } from "react-icons/io5";
import axios from "axios";
import "swiper/css/navigation";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Stores = () => {
	const [data, setData] = useState([]);

	// Fetch shops
	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/shops`)
			.then(response => {
				setData(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching shops:", error);
			});
	}, []);

	return (
		<div className="container">
			<div className="main-contex">
				<p className="component-title">Топ магазины</p>
				<div className="row">
					{data.map(shop => (
						<div key={shop.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
							<div className="store-card px-2 py-4 text-center mb-4">
								<Avatar size={60} className="mb-4" src={`${shop.logo}`} alt={shop.name} icon={<IoLogoUsd />} />
								<p className="mt-1">{shop.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Stores;
