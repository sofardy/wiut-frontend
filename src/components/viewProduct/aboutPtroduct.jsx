import React from "react";
import PropTypes from "prop-types";

const AboutProduct = ({ attributes }) => {
	return (
		<div>
			<h4>Детали товара</h4>
			<div className="row">
				{attributes.map(attribute => (
					<div className="col-md-6 col-12 mb-3" key={attribute.id}>
						<span className="small-text d-block font-weight-bold">{attribute.name}</span>
						<span className="small-text d-block">{attribute.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

AboutProduct.propTypes = {
	attributes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		}),
	).isRequired,
};

export default AboutProduct;
