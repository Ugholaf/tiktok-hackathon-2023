import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";

const PrivateRoute = () => {
  const isLoggedIn = false;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
