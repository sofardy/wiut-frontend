import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { IoLogoUsd } from "react-icons/io5";
import axios from "axios";
import "swiper/css/navigation";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Компонент для отображения списка магазинов.
 * Загружает данные о магазинах из API и выводит их в виде сетки карточек.
 */
const Stores = () => {
	// Состояние для хранения данных магазинов
	const [data, setData] = useState([]);

	// Эффект для загрузки списка магазинов при монтировании компонента
	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/shops`) // Запрос к эндпоинту /shops
			.then(response => {
				setData(response.data.data); // Сохранение данных в состоянии
			})
			.catch(error => {
				console.error("Error fetching shops:", error); // Обработка ошибок
			});
	}, []); // Пустой массив зависимостей - выполняется один раз

	return (
		<div className="container">
			<div className="main-contex">
				<p className="component-title">Top Stores</p> {/* Заголовок секции */}
				{/* Сетка для отображения карточек магазинов */}
				<div className="row">
					{/* Итерация по массиву данных магазинов */}
					{data.map(shop => (
						<div key={shop.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
							{/* Карточка магазина */}
							<div className="store-card px-2 py-4 text-center mb-4">
								{/* Логотип магазина (Avatar) с запасной иконкой */}
								<Avatar size={60} className="mb-4" src={`${shop.logo}`} alt={shop.name} icon={<IoLogoUsd />} />
								{/* Название магазина */}
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
