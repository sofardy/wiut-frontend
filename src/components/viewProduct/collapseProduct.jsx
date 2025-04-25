import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import PropTypes from "prop-types";

/**
 * Компонент для отображения таблицы с предложениями продукта от разных продавцов.
 * Позволяет сворачивать/разворачивать список предложений.
 * @param {Array<Object>} offers - Массив объектов с предложениями.
 * @param {number} offers[].id - Уникальный идентификатор предложения.
 * @param {string} offers[].shop - Название магазина.
 * @param {string} offers[].price - Цена продукта.
 * @param {string} offers[].updated_at_price - Дата последнего обновления цены.
 * @param {string} offers[].shop_product_url - URL продукта в магазине.
 */
const CollapseProduct = ({ offers }) => {
	// Состояние для хранения количества отображаемых предложений
	const [count, setCount] = useState(2);

	return (
		<div>
			<div className="main-contex">
				<h4>{offers.length} других предложения</h4>
				<Table>
					<Thead>
						<Tr>
							<Th className="w-15">Seller</Th>
							<Th className="w-15">Price</Th>
							<Th className="w-20">Updated Date</Th>
							<Th className="w-30 text-end">Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{offers.slice(0, count).map((offer, index) => (
							<Tr className="solid" key={offer.id}>
								<Td className="w-15">{offer.shop}</Td>
								<Td className="w-15">{offer.price} сум</Td>
								<Td className="w-20">{new Date(offer.updated_at_price).toLocaleDateString()}</Td>
								<Td className="w-30 text-end">
									<a
										href={offer.shop_product_url}
										target="_blank"
										rel="noopener noreferrer"
										className="py-2 px-4 main-btn-red"
									>
										Go to {offer.shop}
									</a>
								</Td>
							</Tr>
						))}
						{count < offers.length ? (
							<p
								className="description"
								style={{ marginLeft: "22px", cursor: "pointer" }}
								onClick={() => setCount(offers.length)}
							>
								Show more <FiChevronDown />
							</p>
						) : (
							<p className="description" style={{ marginLeft: "22px", cursor: "pointer" }} onClick={() => setCount(2)}>
								Show less <FiChevronUp />
							</p>
						)}
					</Tbody>
				</Table>
			</div>
		</div>
	);
};

CollapseProduct.propTypes = {
	offers: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			shop: PropTypes.string.isRequired,
			price: PropTypes.string.isRequired,
			updated_at_price: PropTypes.string.isRequired,
			shop_product_url: PropTypes.string.isRequired,
		}),
	).isRequired,
};

export default CollapseProduct;
