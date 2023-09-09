import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import { useIsLoggedIn } from "./hook/useIsLoggedIn";
import GoToMarketPage from "./pages/GoToMarketPage";
import Homepage from "./pages/Homepage";

const PrivateRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/roadmap" element={<GoToMarketPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
