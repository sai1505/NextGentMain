import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import UserDashboardNavbar from "./components/UserDashboardNavbar";
import UserDashboard from "./components/UserDashboard";
import UserValidation from "./components/UserValidation";
import UserOutput from "./components/UserOutput";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/validator" element={<UserValidation />} />
          <Route path="/output" element={<UserOutput />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
