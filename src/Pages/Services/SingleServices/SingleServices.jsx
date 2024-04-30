import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainServices } from "../../../lib/content.js";

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
      </div>
    </div>
  );
}

export default SingleServices;
