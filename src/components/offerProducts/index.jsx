import React, { useState, useEffect } from "react";
import { Pagination, Radio, Select } from "antd";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import axios from "axios";

const OfferProducts = () => {
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const { Option } = Select;

	// Fetch categories
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/categories`)
			.then(response => {
				setCategories(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching categories:", error);
			});
	}, []);

	// Fetch products
	useEffect(() => {
		const categoryFilter = selectedCategory ? `?filter[category_id]=${selectedCategory}` : "";
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products${categoryFilter}`)
			.then(response => {
				setData(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching products:", error);
			});
	}, [selectedCategory]);

	const handleCategoryChange = value => {
		setSelectedCategory(value);
	};

	return (
		<div className="container">
			<div className="main-contex">
				<p className="component-title">Выгодные предложения</p>
				<div className="filters mb-3">
					<div className="d-flex justify-content-between align-items-center">
						<Radio.Group defaultValue="a" buttonStyle="solid">
							<Radio.Button className="filter-radio-item" value="a">
								Самые последние
							</Radio.Button>
							<Radio.Button className="filter-radio-item mx-3" value="b">
								Лучшие ежедневные
							</Radio.Button>
							<Radio.Button className="filter-radio-item" value="c">
								Лучшие еженедельные
							</Radio.Button>
						</Radio.Group>
						<Select
							allowClear
							className="filter-select"
							showSearch
							placeholder="Все категории"
							optionFilterProp="children"
							onChange={handleCategoryChange}
							filterOption={(input, option) => (option?.children).toLowerCase().includes(input.toLowerCase())}
						>
							{categories.map(category => (
								<Option key={category.id} value={category.id}>
									{category.name}
								</Option>
							))}
						</Select>
					</div>
				</div>
				<div className="row">
					{data.map(item => (
						<div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
							<Link to={`/product/${item.slug}`}>
								<div className="product-card product-hover py-3 px-2">
									<img src={item.image} alt={item.title} />
									<p className="name mt-3 mb-1">{item.title}</p>
									<p className="price mb-1">{item.price || "Цена не указана"} сум</p>
									<button className="py-2 px-4 mt-3 main-btn">Cмотреть детали</button>
								</div>
							</Link>
						</div>
					))}
					<div className="mt-4 my-pagination">
						<Pagination
							current={currentPage}
							total={data.length}
							pageSize={12}
							onChange={page => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferProducts;
