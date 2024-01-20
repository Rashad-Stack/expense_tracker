import { formatISO } from "date-fns";

export const menu = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
  },
];

const currentDate = new Date();
const newDate = new Date(currentDate);
export const analysisFilterBy = [
  {
    title: "Weekly",
    value: formatISO(
      newDate.setDate(currentDate.getDate() - currentDate.getDay()),
    ),
  },
  {
    title: "Monthly",
    value: formatISO(newDate.setDate(1)),
  },

  {
    title: "Yearly",
    value: formatISO(newDate.setMonth(1, 12)),
  },
];
