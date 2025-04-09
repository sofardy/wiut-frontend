import React, { useEffect, useState } from "react";
import { Input, Dropdown, Menu } from "antd";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import MobileSidebar from "../sidebars/mobileSidebar";
import useDebounce from "../../hooks/useDebounse";
import useScrollTop from "../../hooks/useScrollTop";
import axios from "axios";
import "../../styles/header.css"; // Убедитесь, что путь к файлу корректный

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HeaderComp = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [categories, setCategories] = useState([]);
	const { width } = useWindowSize();
	const debouncedSearch = useDebounce(search, 1200);
	const navigate = useNavigate();
	const scrollPosition = useScrollTop();

	useEffect(() => {
		if (width > 992) {
			setIsOpen(false);
		}
	}, [width]);

	useEffect(() => {
		if (debouncedSearch) {
			navigate(`/search-result?query=${debouncedSearch}`);
		}
	}, [debouncedSearch, navigate]);

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

	const categoryMenu = (
		<Menu>
			{categories.map(category => (
				<Menu.Item key={category.id}>
					<Link to={`/category/${category.slug}`}>{category.name}</Link>
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<div className={scrollPosition > 120 ? "header header-onscroll" : "header"}>
			<MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="container">
				<div className="d-flex justify-content-between align-items-center flex-none">
					<div className="d-flex justify-content-between align-items-center">
						<FaBars onClick={() => setIsOpen(!isOpen)} className="user-icon me-3 desctop-d-none" />
						<Link to="/" className="logo-text">
							TezTop
						</Link>
						<Input
							style={{ borderRadius: "30px" }}
							placeholder="Search..."
							suffix={<FiSearch style={{ color: "rgba(0,0,0,.45)" }} />}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-start align-items-center mobile-d-none ms-2">
						<Dropdown overlay={categoryMenu}>
							<p className="mb-0 header-text" style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
								Все категории <FiChevronDown />
							</p>
						</Dropdown>
						<NavLink
							className={({ isActive }) => (isActive ? "mb-0 header-text active-link" : "mb-0 header-text")}
							to="/selected-products"
							style={{ whiteSpace: "nowrap" }}
						>
							Популярные продукты
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? "mb-0 header-text active-link" : "mb-0 header-text")}
							to="/offer-products"
							style={{ whiteSpace: "nowrap" }}
						>
							Выгодные предложения
						</NavLink>
						{/* <FaRegUserCircle className="user-icon" /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderComp;
