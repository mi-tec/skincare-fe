import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

const Appointments = () => {
  const _userStorage = sessionStorage.getItem("user");

  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    (async function () {
      const userData = JSON.parse(_userStorage);
      console.log(userData);

      let userId;
      let service;
      if (userData?.type === "user") {
        userId = userData?.id;
      } else {
        service = userData?.service;
      }
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}api/v1/appointment/single`,
        params: {
          userId: userId,
          service: service,
        },
      });

      if (response?.data?.status === 1) {
        setAppointmentData(response?.data?.data);
      }
    })();
  }, [_userStorage]);

  console.log(appointmentData);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
      <DataTable columns={columns} data={appointmentData} />
    </>
  );
};

export default Appointments;
