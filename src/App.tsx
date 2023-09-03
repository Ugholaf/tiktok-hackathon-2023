import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PersonalPage from "./pages/PersonalPage";
import BusinessPage from "./pages/BusinessPage";
import APIIntegration from "./pages/APIIntegration";

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
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/api_integration" element={<APIIntegration />} />
      </Route>
    </Routes>
  );
}

export default App;
