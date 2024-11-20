import { SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const userStore = sessionStorage.getItem("user");
  const userData = JSON.parse(userStore);

  let data = {
    user: {
      name: userData?.username,
      email: userData?.email,
      avatar: "/avatars/shadcn.jpg",
    },
  };

  if (userData?.type === "nurse") {
    data.navMain = [
      {
        title: "Appointments",
        url: "/admin-dashboard/appointments",
        isActive: false,
        items: [
          {
            title: "All Appointments",
            url: "/admin-dashboard/appointments",
          },
        ],
      },
      {
        title: "Nurses",
        url: "/admin-dashboard/nurses",
        isActive: false,
        items: [
          {
            title: "Nurses List",
            url: "/admin-dashboard/nurses",
          },
          {
            title: "Create Nurse Account",
            url: "/admin-dashboard/create-nurse",
          },
        ],
      },
      {
        title: "Doctors",
        url: "/admin-dashboard/doctors",
        isActive: false,
        items: [
          {
            title: "Doctors List",
            url: "/admin-dashboard/doctors",
          },
          {
            title: "Create Doctor Account",
            url: "/admin-dashboard/create-doctor",
          },
        ],
      },
    ];
  } else if (userData?.type === "doctor") {
    data.navMain = [
      {
        title: "Appointments",
        url: "/admin-dashboard/appointments",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "All Appointments",
            url: "/admin-dashboard/appointments",
          },
        ],
      },
    ];
  } else {
    data.navMain = [
      {
        title: "Appointments",
        url: "/user-dashboard/appointments",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "All Appointments",
            url: "/user-dashboard/appointments",
          },
          {
            title: "Make an Appointment",
            url: "/services",
          },
        ],
      },
    ];
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
