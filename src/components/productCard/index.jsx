import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ image, name, price, buttonText }) => {
	return (
		<div className="product-card p-3">
			<img src={image} alt={name} />
			<p className="name mt-3 mb-1">{name}</p>
			<p className="price mb-1">{price}</p>
			<button className="py-2 px-4 mt-3 main-btn">{buttonText}</button>
		</div>
	);
};

ProductCard.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
};

export default ProductCard;
