import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainServices } from "../../../lib/content.js";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Meeting",
    start: new Date(2024, 3, 30, 10, 0),
    end: new Date(2024, 3, 30, 11, 0),
  },
  {
    id: 2,
    title: "Lunch",
    start: new Date(2024, 3, 30, 12, 0),
    end: new Date(2024, 3, 30, 13, 0),
  },
];

function SingleServices() {
  let { singleService } = useParams();
  const [service, setService] = useState();

  useEffect(() => {
    const pageData = mainServices.find((item) => singleService === item.slug);

    setService(pageData);
  }, [singleService]);

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
        <p>{service.desc}</p>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: "auto" }}
          defaultView="week"
          drilldownView="week"
        />
      </div>
    </div>
  );
}

export default SingleServices;
