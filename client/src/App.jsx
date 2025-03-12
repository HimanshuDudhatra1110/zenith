import { lazy, Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes.jsx";
import SidebarLayout from "./components/SidebarLayout.jsx";

const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="antialiased flex h-full text-base text-gray-700 dark:bg-coal-500 main-top-container">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route element={<SidebarLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
