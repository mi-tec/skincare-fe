import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export const columns = [
  {
    accessorKey: "NOTE",
    header: "Note",
  },
  {
    accessorKey: "SERVICE_NAME",
    header: "Service Name",
    cell: ({ row }) => {
      let val = row.getValue("SERVICE_NAME");
      val = val.replace("-", " ").toUpperCase();

      return val;
    },
  },
  {
    accessorKey: "START_TIME",
    header: "Time",
    cell: ({ row }) => {
      const val = row.getValue("START_TIME");
      const date = new Date(val);

      const formattedDate = date.toLocaleString("en-GB");

      return formattedDate;
    },
  },
  {
    header: "Profile Report",
    id: "profile",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      console.log("data ->", data);

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Profile Report</DialogTitle>
            </DialogHeader>
            <div className="grid py-4">
              <p className="font-semibold">Basic Details</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Full Name</div>
              <div className="grid ">{data?.FULL_NAME}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Contact Number</div>
              <div className="grid ">{data?.CONTACT_NUMBER}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Email</div>
              <div className="grid ">{data?.EMAIL}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">NIC</div>
              <div className="grid ">{data?.NIC}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Country</div>
              <div className="grid ">{data?.COUNTRY}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Emergency Contact</div>
              <div className="grid ">{data?.EMERGENCY_CONTACT}</div>
            </div>
            <Separator />
            <div className="grid py-4">
              <p className="font-semibold">Health Info</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Allergies</div>
              <div className="grid ">{data?.ALLERGIES}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Consent From</div>
              <div className="grid ">{data?.CONSENT_FROM}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Medications</div>
              <div className="grid ">{data?.MEDICATIONS}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Previous On Going Treatment</div>
              <div className="grid ">{data?.PREVIOUS_ONGOING_TREATMENT}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid ">Skin Conditions</div>
              <div className="grid ">{data?.SKIN_CONDITIONS}</div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
