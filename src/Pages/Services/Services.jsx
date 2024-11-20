import { mainServices } from "@/lib/content";
import React from "react";
import { Link } from "react-router-dom";

function Services() {
	return <div className="home-body general-block ">
		<div className="main-services mt-5 grid grid-cols-3 gap-4">
			{mainServices.map((item, i) => {
				return (
					<div
						className="rounded-lg border bg-card text-card-foreground shadow-sm"
						key={i}
					>
						<div
							className="bg-cover bg-center bg-no-repeat min-h-[250px]"
							style={{ backgroundImage: `url(${item.image})` }}
						></div>
						<div className="flex flex-col space-y-1.5 p-6">
							<div className="text-2xl font-semibold leading-none tracking-tight">
								{item.title}
							</div>
						</div>
						<div className="p-6 pt-0">
							<p>
								{item.desc.length <= 100
									? item.desc
									: item.desc.slice(0, 100) + "..."}
							</p>
						</div>
						<div className="flex items-center p-6 pt-0">
							<div className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
								<Link to={`/services/${item.slug}`}>View More</Link>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	</div>;
}

export default Services;
