import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

const Appointments = () => {
	const _userStorage = sessionStorage.getItem("user");

	const [appointmentData, setAppointmentData] = useState([]);

	useEffect(() => {
		(async function() {
			const userData = JSON.parse(_userStorage);
			const response = await axios({
				method: "get",
				url: `${import.meta.env.VITE_BASE_URL}api/v1/appointment/single`,
				params: {
					userId: userData?.id,
				},
			});

			console.log(response);
			if (response?.data?.status === 1) {
				setAppointmentData(response?.data?.data);
			}

		})();
	}, [_userStorage]);


	console.log(appointmentData);

	return <>
		<h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
		<DataTable columns={columns} data={appointmentData} />
	</>
}

export default Appointments;
