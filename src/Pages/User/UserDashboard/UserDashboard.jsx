import { Children, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"

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

	return (<SidebarProvider>
		<AppSidebar />
		<SidebarInset>
			<header
				className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<Outlet />
			</div>
		</SidebarInset>
	</SidebarProvider>)
}

export default UserDashboard;
