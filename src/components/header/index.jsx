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

/**
 * Компонент шапки сайта.
 * Включает логотип, поиск, навигацию по категориям и основным разделам,
 * а также адаптивное мобильное меню.
 */
const HeaderComp = () => {
	// Состояния компонента
	const [isOpen, setIsOpen] = useState(false); // Состояние открытости мобильного меню
	const [search, setSearch] = useState(""); // Текущее значение поискового запроса
	const [categories, setCategories] = useState([]); // Список категорий для меню

	// Хуки
	const { width } = useWindowSize(); // Получение ширины окна
	const debouncedSearch = useDebounce(search, 1200); // Значение поиска с задержкой
	const navigate = useNavigate(); // Функция для программной навигации
	const scrollPosition = useScrollTop(); // Текущая позиция скролла

	// Эффект для закрытия мобильного меню при увеличении ширины окна
	useEffect(() => {
		if (width > 992) {
			setIsOpen(false);
		}
	}, [width]);

	// Эффект для выполнения поиска при изменении debouncedSearch
	useEffect(() => {
		if (debouncedSearch) {
			// Переход на страницу результатов поиска с запросом
			navigate(`/search-result?query=${debouncedSearch}`);
		}
		// Не перенаправлять, если строка поиска пуста, чтобы избежать лишних редиректов
	}, [debouncedSearch, navigate]);

	// Эффект для загрузки категорий при монтировании
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

	// Генерация меню категорий для Dropdown
	const categoryMenu = (
		<Menu>
			{categories.map(category => (
				<Menu.Item key={category.id}>
					{/* Ссылка на страницу категории */}
					<Link to={`/category/${category.slug}`}>{category.name}</Link>
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		// Динамическое добавление класса header-onscroll при скролле
		<div className={scrollPosition > 120 ? "header header-onscroll" : "header"}>
			{/* Мобильное боковое меню */}
			<MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="container">
				<div className="d-flex justify-content-between align-items-center flex-none">
					{/* Левая часть хедера: бургер, логотип, поиск */}
					<div className="d-flex justify-content-between align-items-center">
						{/* Иконка бургер-меню (только на мобильных) */}
						<FaBars onClick={() => setIsOpen(!isOpen)} className="user-icon me-3 desctop-d-none" />
						{/* Логотип (ссылка на главную) */}
						<Link to="/" className="logo-text">
							TezTop
						</Link>
						{/* Поле поиска */}
						<Input
							style={{ borderRadius: "30px" }}
							placeholder="Search..."
							suffix={<FiSearch style={{ color: "rgba(0,0,0,.45)" }} />} // Иконка лупы
							onChange={e => setSearch(e.target.value)} // Обновление состояния поиска при вводе
						/>
					</div>
					{/* Правая часть хедера: навигация (только на десктопе) */}
					<div className="d-flex justify-content-start align-items-center mobile-d-none ms-2">
						{/* Выпадающее меню категорий */}
						<Dropdown overlay={categoryMenu}>
							<p className="mb-0 header-text" style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
								All Categories <FiChevronDown />
							</p>
						</Dropdown>
						{/* Ссылка на Popular Products */}
						<NavLink
							className={({ isActive }) => (isActive ? "mb-0 header-text active-link" : "mb-0 header-text")}
							to="/selected-products"
							style={{ whiteSpace: "nowrap" }}
						>
							Popular Products
						</NavLink>
						{/* Ссылка на Best Offers */}
						<NavLink
							className={({ isActive }) => (isActive ? "mb-0 header-text active-link" : "mb-0 header-text")}
							to="/offer-products"
							style={{ whiteSpace: "nowrap" }}
						>
							Best Offers
						</NavLink>
						{/* <FaRegUserCircle className="user-icon" /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderComp;
