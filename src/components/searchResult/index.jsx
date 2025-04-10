import { Col, Pagination, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SearchResult = () => {
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const location = useLocation();

	// Extract query from URL
	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get("query") || "";

	// Fetch categories
	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/categories`)
			.then(response => {
				setCategories(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching categories:", error);
			});
	}, []);

	// Fetch products based on query and category
	useEffect(() => {
		const categoryFilter = selectedCategory ? `&filter[category_id]=${selectedCategory}` : "";
		axios
			.get(`${API_BASE_URL}/products?filter[title]=${query}${categoryFilter}`)
			.then(response => {
				setData(response.data.data);
			})
			.catch(error => {
				console.error("Error fetching products:", error);
			});
	}, [query, selectedCategory]);

	const handleCategoryChange = value => {
		setSelectedCategory(value);
	};

	return (
		<div className="container">
			<div className="main-contex search-result">
				<div className="filters mb-5">
					<div className="row">
						<div className="col-md-4 pt-2">
							<span className="component-title me-3">Search results:</span>
							<h6 className="d-inline-block">{query || "All products"}</h6>
						</div>
						<div className="col-md-4">
							<Select
								allowClear
								className="filter-select w-100 mt-2"
								showSearch
								placeholder="All categories"
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
				</div>
				{data.map((item, index) => (
					<div key={item.id} className="search-card">
						<Row>
							<Col xl={7} md={12} span={24}>
								<img src={item.image} className="w-100" alt={item.title} />
							</Col>
							<Col xl={7} md={12} span={24}>
								<div className="d-flex align-items-start flex-column h-220">
									<h6 className="mb-auto bd-highlight">{item.title}</h6>
									<div className="bd-highlight">
										<p>Model: {item.model || "Not specified"}</p>
										<Link to={`/product/${item.slug}`}>
											<button className="py-2 px-4 mt-3 d-md-none main-btn">View on {item.shop || "store"}</button>
										</Link>
									</div>
								</div>
							</Col>
							<Col xl={5} md={12} span={12}>
								<h5>Store</h5>
								<p className="mb-3">{item.shop || "Not specified"}</p>
							</Col>
							<Col xl={5} md={12} span={12}>
								<h5>Current price:</h5>
								<p className="mb-3">{item.price || "Out of stock"} UZS</p>
							</Col>
							<Link to={`/product/${item.slug}`}>
								<button className="py-2 px-4 mt-3 d-md-inline-block w-100 main-btn">
									View on {item.shop || "store"}
								</button>
							</Link>
						</Row>
					</div>
				))}
				<div className="mt-4 my-pagination">
					<Pagination defaultCurrent={1} total={data.length} />
				</div>
			</div>
		</div>
	);
};

export default SearchResult;
