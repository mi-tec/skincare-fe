import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

const DoctorsList = () => {
  const _userStorage = sessionStorage.getItem("user");

  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}api/v1/doctors`,
      });

      if (response?.data?.status === 1) {
        setAppointmentData(response?.data?.data);
      }
    })();
  }, [_userStorage]);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
      <DataTable columns={columns} data={appointmentData} />
    </>
  );
};

export default DoctorsList;
