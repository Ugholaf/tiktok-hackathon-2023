import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PersonalPage from "./pages/PersonalPage";

const PrivateRoute = () => {
  const isLoggedIn = true;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/personal" element={<PersonalPage />} />
      </Route>
    </Routes>
  );
}

export default App;
