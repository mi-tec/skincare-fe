"use client";

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
];
