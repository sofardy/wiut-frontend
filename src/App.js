import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/es/style/reset.css'; // Изменено для antd@5
import 'swiper/css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import RoutesMiddleware from './routers/routerMiddleware';

function App() {
  return (
    <div>
      <RoutesMiddleware />
    </div>
  );
}

export default App;
