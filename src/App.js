import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
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
