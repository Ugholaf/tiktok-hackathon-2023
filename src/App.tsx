import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PersonalPage from "./pages/PersonalPage";
import BusinessPage from "./pages/BusinessPage";
import APIIntegration from "./pages/APIIntegration";
import { useIsLoggedIn } from "./hook/useIsLoggedIn";

const PrivateRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

const PublicRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Navigate to="/personal" /> : <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/api_integration" element={<APIIntegration />} />
      </Route>
    </Routes>
  );
}

export default App;
