import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import UserLogin from "../Pages/User/UserLogin/UserLogin";
import UserRegister from "../Pages/User/UserRegister/UserRegister";
import UserOnBoarding from "../Pages/User/UserOnBoarding/UserOnBoarding";
import UserDashboard from "../Pages/User/UserDashboard/UserDashboard";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Home />} />
				<Route path="/about-us" element={"test"} />
			</Route>
			<Route path="user-login" element={<UserLogin />} />
			<Route path="user-register" element={<UserRegister />} />
			<Route path="user-onboarding" element={<UserOnBoarding />} />
			<Route path="user-dashboard" element={<UserDashboard />} />
		</>
	)
);

export default router;
