"use client";

export const columns = [
  {
    accessorKey: "USER_ID",
    header: "ID",
  },
  {
    accessorKey: "USERNAME",
    header: "Username",
  },
  {
    accessorKey: "FULL_NAME",
    header: "Full Name",
  },

  {
    accessorKey: "EMAIL",
    header: "email",
  },
  {
    accessorKey: "PERMITTED_SERVICE",
    header: "Service Name",
    cell: ({ row }) => {
      let val = row.getValue("PERMITTED_SERVICE");
      val = val.replace("-", " ").toUpperCase();

      return val;
    },
  },
];
