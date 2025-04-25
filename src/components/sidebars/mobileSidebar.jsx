import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize"; // Хук для получения размеров окна
import { NavLink } from "react-router-dom"; // Компонент для навигационных ссылок
import useScrollTop from "../../hooks/useScrollTop"; // Хук для отслеживания позиции скролла

/**
 * Компонент бокового меню для мобильных устройств.
 * @param {boolean} isOpen - Состояние, открыто ли меню.
 * @param {Function} setIsOpen - Функция для изменения состояния isOpen.
 */
const MobileSidebar = ({ isOpen, setIsOpen }) => {
	const { width } = useWindowSize(); // Получение текущей ширины окна
	const scrollPosition = useScrollTop(); // Получение текущей позиции скролла

	// Состояния для управления стилями (позиция меню и размытие фона)
	const [rightS, setRightS] = useState({ right: "20%" }); // Стиль для позиционирования меню
	const [blur, setblur] = useState({ right: "100%" }); // Стиль для позиционирования фона

	// Эффект для анимации фона (размытия) при открытии/закрытии меню
	useEffect(() => {
		if (isOpen) {
			// Небольшая задержка для синхронизации с анимацией меню
			setTimeout(() => {
				setblur({ right: "0%" }); // Показать фон
			}, 200);
		} else {
			setTimeout(() => {
				setblur({ right: "100%" }); // Скрыть фон
			}, 200);
		}
	}, [isOpen]);

	// Эффект для блокировки/разблокировки скролла основного контента
	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = "auto"; // Разрешить скролл
		} else {
			document.body.style.overflowY = "hidden"; // Запретить скролл по Y
		}
		// Очистка эффекта при размонтировании компонента
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	// Эффект для адаптации ширины меню в зависимости от ширины экрана
	useEffect(() => {
		if (width > 768) {
			setRightS({ right: "50%" }); // Ширина 50% для больших экранов
		} else if (width > 576) {
			setRightS({ right: "40%" }); // Ширина 60% для средних экранов
		} else {
			setRightS({ right: "20%" }); // Ширина 80% для маленьких экранов
		}
	}, [width]);

	return (
		<div>
			{/* Размытый фон, закрывающий меню по клику */}
			<div
				className={scrollPosition > 100 ? "bg-blur p-3 sidebar-top" : "bg-blur p-3"} // Добавляем класс sidebar-top при скролле
				onClick={() => setIsOpen(false)} // Закрыть меню по клику на фон
				style={blur} // Анимированный стиль для фона
			></div>
			{/* Обертка самого меню */}
			<div
				className={scrollPosition > 100 ? "sidebar-wrapper p-3 sidebar-top" : "sidebar-wrapper p-3"}
				// Стиль для анимации появления/скрытия меню и адаптивной ширины
				style={!isOpen ? { right: "100vw" } : rightS}
			>
				{/* Контент меню (ссылки) */}
				<div className="d-flex align-items-start flex-column bd-highlight" style={{ height: "100%" }}>
					{/* Ссылка на Popular Products */}
					<NavLink
						className={({ isActive }) =>
							isActive
								? "mb-0 header-text active-link d-inline-block my-3 bd-highlight"
								: "mb-0 bd-highlight header-text d-inline-block my-3"
						} // Добавляем класс active-link для активной ссылки
						to="/selected-products" // Путь ссылки
						style={{ whiteSpace: "nowrap" }} // Предотвращение переноса текста
						onClick={() => setIsOpen(false)} // Закрыть меню при клике на ссылку
					>
						Popular Products
					</NavLink>
					<br />
					{/* Ссылка на Best Offers */}
					<NavLink
						className={({ isActive }) =>
							isActive
								? "header-text active-link d-inline-block bd-highlight"
								: "bd-highlight header-text d-inline-block"
						}
						to="/offer-products"
						style={{ whiteSpace: "nowrap" }}
						onClick={() => setIsOpen(false)} // Закрыть меню при клике на ссылку
					>
						Best Offers
					</NavLink>
				</div>
			</div>
		</div>
	);
};
export default MobileSidebar;
