import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Хук для получения параметров из URL
import CollapseProduct from "./collapseProduct"; // Компонент для отображения предложений других продавцов
import StatisticsProduct from "./statistics"; // Компонент для отображения статистики цен
import { Radio } from "antd"; // Компонент Radio из Ant Design
import AboutProduct from "./aboutPtroduct"; // Компонент для отображения деталей продукта
import { AiOutlineHeart } from "react-icons/ai"; // Иконка сердца
import axios from "axios"; // Библиотека для HTTP-запросов

// Базовый URL API, берется из переменных окружения
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Компонент страницы просмотра отдельного продукта.
 * Загружает данные продукта по slug из URL и отображает информацию,
 * предложения других продавцов, статистику цен и детали продукта.
 */
const ProductView = () => {
	const { slug } = useParams(); // Получение slug продукта из URL
	// Состояние для переключения между статистикой (1) и деталями продукта (2)
	const [statistic, setStatistic] = useState(1);
	// Состояние для хранения данных загруженного продукта
	const [product, setProduct] = useState(null);

	// Эффект для загрузки данных продукта при монтировании компонента или изменении slug
	useEffect(() => {
		if (!slug) {
			console.error("Slug is undefined"); // Обработка случая, если slug отсутствует
			return;
		}

		// Выполнение GET-запроса к API для получения данных продукта
		axios
			.get(`${API_BASE_URL}/products/${slug}`)
			.then(response => {
				setProduct(response.data.data); // Сохранение полученных данных в состоянии
			})
			.catch(error => {
				console.error("Error fetching product:", error); // Обработка ошибки загрузки
			});
	}, [slug]); // Зависимость эффекта от slug

	// Если slug отсутствует в URL, показать ошибку
	if (!slug) {
		return <div>Error: slug not provided in URL.</div>;
	}

	// Если данные продукта еще не загружены, показать индикатор загрузки
	if (!product) {
		return <div>Loading...</div>;
	}

	// Рендеринг компонента
	return (
		<div className="container">
			<div className="main-contex">
				<div className="product-view">
					<div className="row">
						{/* Левая колонка: Изображение продукта */}
						<div className="col-md-4">
							<img src={product.image} className="w-100" alt={product.title} />
						</div>
						{/* Средняя колонка: Название и описание продукта */}
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
						{/* Правая колонка: Цена, магазин, кнопка "Избранное", ссылка на магазин */}
						<div className="col-md-3">
							<div className="d-flex align-items-end flex-column hight-300">
								<div className="mb-auto bd-highlight text-end w-100-mobile">
									<AiOutlineHeart className="mt-md-5 mb-2" style={{ fontSize: "22px" }} />{" "}
									{/* Иконка "Добавить в избранное" */}
									<h5 className="mb-0">{product.price} сум</h5> {/* Цена */}
									<span className="small-text d-block mb-2">{product.offers[0]?.shop}</span>{" "}
									{/* Первый магазин из предложений */}
									<span className="small-text">
										{new Date(product.offers[0]?.updated_at_price).toLocaleString()}
									</span>{" "}
									{/* Дата обновления цены первого предложения */}
								</div>
								<div className="bd-highlight w-100-mobile">
									{/* Кнопка-ссылка на страницу продукта в магазине */}
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

					{/* Компонент с таблицей предложений других продавцов */}
					<CollapseProduct offers={product.offers} />

					{/* Переключатель между статистикой и деталями */}
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

					{/* Условный рендеринг: Статистика или Детали продукта */}
					{statistic === 1 ? <StatisticsProduct /> : <AboutProduct attributes={product.attributes} />}
				</div>
			</div>
		</div>
	);
};

export default ProductView;
