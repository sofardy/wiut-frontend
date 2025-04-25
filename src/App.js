// Import global styles for external libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'swiper/css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

// Import the router middleware component
import RoutesMiddleware from './routers/routerMiddleware';

/**
 * The main application component.
 * Imports necessary global styles and renders the router middleware.
 */
function App() {
  return (
    <div>
      <RoutesMiddleware />
    </div>
  );
}

export default App;
