import {Routes, Route} from 'react-router-dom'
import Home from '../../pages/Homes';
import History from '../../pages/History';

const Router = () => {
  return(
    <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/History"} element={<History />} />
    </Routes>
  )
};

export default Router;
