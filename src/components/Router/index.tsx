import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Homes";
import History from "../../pages/History";
import DefaultLayout from "../../layouts/DeaultLayout";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<DefaultLayout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/History"} element={<History />} />
      </Route>
    </Routes>
  );
};

export default Router;
