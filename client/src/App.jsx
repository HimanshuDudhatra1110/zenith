import { lazy, Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes.jsx";
import SidebarLayout from "./components/SidebarLayout.jsx";

const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Notes = lazy(() => import("./pages/note/Notes.jsx"));
const ViewNote = lazy(() => import("./pages/note/ViewNote.jsx"));
const Diary = lazy(() => import("./pages/Diary.jsx"));
const HabitTracking = lazy(() => import("./pages/HabitTracking.jsx"));

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
                <Route path={ROUTES.NOTES} element={<Notes />} />
                <Route path={`${ROUTES.NOTE}/:id`} element={<ViewNote />} />
                <Route path={ROUTES.DIARY} element={<Diary />} />
                <Route path={ROUTES.HABIT} element={<HabitTracking />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
