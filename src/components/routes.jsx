import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import UserLogin from "../Pages/User/UserLogin/UserLogin";
import UserRegister from "../Pages/User/UserRegister/UserRegister";
import UserOnBoarding from "../Pages/User/UserOnBoarding/UserOnBoarding";
import UserDashboard from "../Pages/User/UserDashboard/UserDashboard";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import SingleServices from "../Pages/Services/SingleServices/SingleServices";
import Appointments from "@/Pages/User/UserDashboard/Appointments";
import AdminRegister from "@/Pages/Admin/Register";
import AdminLogin from "@/Pages/Admin/Login";
import NursesList from "@/Pages/Admin/Dashboard/Nurses";
import CreateNurse from "@/Pages/Admin/Dashboard/Nurses/CreateNurse";
import DoctorsList from "@/Pages/Admin/Dashboard/Doctors";
import CreateDoctor from "@/Pages/Admin/Dashboard/Doctors/CreateDoctor";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/about-us" element={"test"} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:singleService" element={<SingleServices />} />
      </Route>
      <Route path="user-login" element={<UserLogin />} />
      <Route path="user-register" element={<UserRegister />} />
      <Route path="user-onboarding" element={<UserOnBoarding />} />
      <Route path="user-dashboard" element={<UserDashboard />}>
        <Route path="appointments" element={<Appointments />} />
      </Route>
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="admin-register" element={<AdminRegister />} />
      <Route path="admin-onboarding" element={<UserOnBoarding />} />
      <Route path="admin-dashboard" element={<UserDashboard />}>
        <Route path="appointments" element={<Appointments />} />
        <Route path="nurses" element={<NursesList />} />
        <Route path="create-nurse" element={<CreateNurse />} />
        <Route path="doctors" element={<DoctorsList />} />
        <Route path="create-doctor" element={<CreateDoctor />} />
      </Route>
    </>,
  ),
);

export default router;
