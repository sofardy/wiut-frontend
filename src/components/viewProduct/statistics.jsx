import React from "react";
import { Column } from "@ant-design/plots"; // Компонент гистограммы из Ant Design Plots
import { Checkbox, Input, Select, Slider } from "antd"; // Компоненты из Ant Design

// Компонент для отображения статистики продукта (истории цен) и фильтров
const StatisticsProduct = () => {
	// Данные для гистограммы (пример)
	const data = [
		{
			type: "f",
			sales: 38,
		},
		{
			type: "q",
			sales: 52,
		},
		{
			type: "w",
			sales: 61,
		},
		{
			type: "r",
			sales: 145,
		},
		{
			type: "t",
			sales: 48,
		},
		{
			type: "y",
			sales: 38,
		},
		{
			type: "u",
			sales: 38,
		},
		{
			type: "i",
			sales: 38,
		},
		{
			type: "a",
			sales: 48,
		},
		{
			type: "b",
			sales: 38,
		},
		{
			type: "c",
			sales: 38,
		},
		{
			type: "d",
			sales: 100,
		},
		{
			type: "e",
			sales: 48,
		},
		{
			type: "p",
			sales: 25,
		},
		{
			type: "g",
			sales: 38,
		},
		{
			type: "h",
			sales: 38,
		},
	];

	// Конфигурация для гистограммы
	const config = {
		data, // Данные
		xField: "type", // Поле для оси X
		yField: "sales", // Поле для оси Y
		label: {
			// Настройки меток данных
			position: "bottom",
			style: {
				fill: "#FFFFFF",
				opacity: 0.6,
			},
		},
		xAxis: {
			// Настройки оси X
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			// Метаданные полей
			type: {
				alias: "salom", // Псевдоним для поля 'type'
			},
			sales: {
				alias: "salom", // Псевдоним для поля 'sales'
			},
		},
		color: ({ type }) => {
			// Функция для определения цвета столбцов
			if (type === "r" || type === "p") {
				return "#000000";
			}
			return "#D9D9D9";
		},
		style: {
			// Стили столбцов
			borderRadius: 25,
			shadowColor: "black",
		},
	};

	// Метки для слайдера временного диапазона
	const marks = {
		0: "1M",
		30: "3M",
		60: "6M",
		100: "всё время",
	};

	return (
		<>
			{/* Секция фильтров */}
			<div className="filters mb-3">
				<div className="row">
					<div className="col-md-4">
						<span className="small-text">Store</span>
						<Input style={{ borderRadius: "25.5px" }} placeholder="Search..." className="filter-select w-100 mt-2" />
					</div>
					<div className="col-md-4">
						<span className="small-text">Store</span>
						<Select
							allowClear
							className="w-100 mt-2"
							showSearch
							placeholder="All categories"
							optionFilterProp="children"
							defaultActiveFirstOption={true}
							filterOption={(input, option) => (option?.children).toLowerCase().includes(input.toLowerCase())}
						>
							<Select.Option value="jack">alifshop</Select.Option>
							<Select.Option value="lucy">Lucy</Select.Option>
							<Select.Option value="tom">Tom</Select.Option>
						</Select>
					</div>
					<div className="col-md-4">
						<span className="small-text">Store</span>
						<Input style={{ borderRadius: "25.5px" }} placeholder="Search..." className="filter-select w-100 mt-2" />
					</div>
				</div>
			</div>

			{/* Основной контент с графиком */}
			<div className="main-contex">
				<p className="component-title">Price History</p>
				<div className="row">
					<div className="col-md-8">
						{/* Отображение гистограммы */}
						<Column {...config} />
					</div>
					<div className="col-md-4">
						{/* Элементы управления справа от графика */}
						<div className="d-flex flex-column bd-highlight h-md-400">
							<div className="bd-highlight">
								<p className="description">Time Range</p>
								{/* Слайдер для выбора временного диапазона */}
								<Slider marks={marks} defaultValue={37} />
							</div>
							<div className="bd-highlight my-auto">
								<p className="description mt-5">Time Range</p>
								{/* Чекбоксы для фильтрации */}
								<div className="mb-2">
									<Checkbox>alifshop.uz</Checkbox>
								</div>
								<Checkbox>alifshop.uz</Checkbox>
							</div>
							<div className="bd-highlight">
								{/* Кнопка перехода на страницу магазина */}
								<button className="py-2 px-4 main-btn">View on alifshop</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StatisticsProduct;
