import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectedProducts from "./components/selectedProducts";
import CategoryProducts from "./components/categoryProducts"; // Импорт компонента для категорий
import ProductView from "./components/viewProduct";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SelectedProducts />} />
				<Route path="/category/:slug" element={<CategoryProducts />} /> {/* Настроен маршрут для категории */}
				<Route path="/product/:slug" element={<ProductView />} />
			</Routes>
		</Router>
	);
};

export default App;
