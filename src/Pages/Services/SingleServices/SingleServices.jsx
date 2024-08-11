import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainServices } from "../../../lib/content.js";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const localizer = momentLocalizer(moment);

function SingleServices() {
  let { singleService } = useParams();
  const [service, setService] = useState();

  const [errorLogin, setErrorLogin] = useState("");
  const [successLogin, setSuccessLogin] = useState("");

  const [loading, setLoading] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState("");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const pageData = mainServices.find((item) => singleService === item.slug);

    setService(pageData);
  }, [singleService]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}api/v1/appointment`,
        params: {
          serviceName: singleService,
        },
      });

      const data = [];

      if (response?.data?.status === 1) {
        const _data = response?.data?.data;

        console.log(_data);

        let index = 1;
        for (const item in _data) {
          const date = new Date(_data[item]?.start_time);

          const year = date.getFullYear();
          const month = String(date.getMonth()).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          const newDate = new Date(year, month, day, hours, minutes);

          const endDate = new Date(newDate.getTime() + 60 * 30 * 1000);

          data.push({
            id: index,
            title: _data[item]?.note,
            start: newDate,
            end: endDate,
          });

          index++;
        }
      }

      console.log(data);

      setEvents(data);
    })();
  }, [loading, singleService]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  async function onSubmit(values) {
    setSuccessLogin("");
    setErrorLogin("");

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}api/v1/appointment`, {
        ...values,
        serviceName: singleService,
      });

      setSuccessLogin("Appointment Created");
      setAppointmentDate("");
    } catch (error) {
      setErrorLogin("Error creating appointment");
    }
    setLoading(false);
  }

  const handleChange = (dateChange) => {
    setValue("appointmentDate", dateChange, {
      shouldDirty: true,
    });
    setAppointmentDate(dateChange);
  };

  if (!service) {
    return "Empty";
  }

  return (
    <div className="general-block">
      <div
        className="bg-cover bg-center bg-no-repeat min-h-[400px]"
        style={{ backgroundImage: `url(${service.image})` }}
      ></div>
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-2xl font-semibold leading-none tracking-tight">
          <h1>{service.title}</h1>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex">
          <p>{service.desc}</p>
        </div>

        <div className="mx-auto mt-10 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Make an appointment
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col spacing-y-5">
                <input
                  type={"text"}
                  className={
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                  {...register("note", {
                    required: "Note is required",
                  })}
                  placeholder="Note"
                />
                {errors.note && (
                  <span className="text-rose-600 text-sm mt-1">{`${errors.note.message}`}</span>
                )}
              </div>

              <div className="flex flex-col spacing-y-5">
                <Controller
                  name="appointmentDate"
                  control={control}
                  defaultValue={appointmentDate}
                  render={() => (
                    <DatePicker
                      selected={appointmentDate}
                      onChange={handleChange}
                      showTimeSelect
                      dateFormat="yyyy - MMMM - d, h:mm aa"
                      className={
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      }
                      minDate={new Date()}
                      minTime={setHours(setMinutes(new Date(), 0), 9)}
                      maxTime={setHours(setMinutes(new Date(), 15), 17)}
                    />
                  )}
                />
                {errors.appointmentDate && (
                  <span className="text-rose-600 text-sm mt-1">{`${errors.appointmentDate.message}`}</span>
                )}
              </div>

              <input
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              />
            </form>

            {errorLogin !== "" && (
              <div className={`text-white rounded-md bg-red-600 px-4 py-2`}>
                {errorLogin}
              </div>
            )}

            {successLogin !== "" && (
              <div className={`text-white rounded-md bg-green-600 px-4 py-2`}>
                {successLogin}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            "Calender updating"
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ margin: "auto" }}
              defaultView="week"
              drilldownView="week"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleServices;
