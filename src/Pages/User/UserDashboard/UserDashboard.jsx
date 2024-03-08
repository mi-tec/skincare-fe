import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const _accessToken = sessionStorage.getItem("accessToken");
    const _userStorage = sessionStorage.getItem("user");

    if (!_accessToken) {
      navigate("/");

      return;
    }

    if (!_userStorage) {
      navigate("/");

      return;
    }

    const _user = JSON.parse(_userStorage);

    if (_user?.isOnBoarding === 1) {
      navigate("/user-onboarding");

      return;
    }
  }, [navigate]);
  return <div>Dashboard</div>;
}

export default UserDashboard;
